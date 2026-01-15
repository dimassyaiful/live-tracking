"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let JobsService = class JobsService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async generateJobCode() {
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const jobsCount = await this.prisma.job.count({
            where: {
                createdAt: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
        });
        const sequenceNumber = String(jobsCount + 1).padStart(5, '0');
        return `JOB-${dateStr}-${sequenceNumber}`;
    }
    async createJob(createJobDto) {
        const jobCode = await this.generateJobCode();
        if (createJobDto.assignedTo) {
            const user = await this.prisma.user.findUnique({
                where: { uuid: createJobDto.assignedTo },
            });
            if (!user) {
                throw new common_1.BadRequestException(`User with UUID ${createJobDto.assignedTo} does not exist`);
            }
        }
        try {
            const job = await this.prisma.job.create({
                data: {
                    jobCode,
                    jobStatus: 'planned',
                    description: createJobDto.description,
                    assignedTo: createJobDto.assignedTo || null,
                    pickup: {
                        create: {
                            address: createJobDto.pickup.address,
                            lat: createJobDto.pickup.lat,
                            lng: createJobDto.pickup.lng,
                        },
                    },
                    delivery: {
                        create: {
                            address: createJobDto.delivery.address,
                            lat: createJobDto.delivery.lat,
                            lng: createJobDto.delivery.lng,
                            polyline: createJobDto.delivery.polyline,
                            distanceKm: createJobDto.delivery.distanceKm,
                            eta: new Date(createJobDto.delivery.eta),
                            etd: new Date(createJobDto.delivery.etd),
                            estimateDuration: createJobDto.delivery.estimateDuration,
                        },
                    },
                },
                include: {
                    pickup: true,
                    delivery: true,
                },
            });
            return {
                message: 'Job created successfully',
                data: job,
            };
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new common_1.BadRequestException('Invalid user reference for assignedTo field');
            }
            throw error;
        }
    }
    async getAllJobs() {
        const jobs = await this.prisma.job.findMany({
            where: {
                jobStatus: { not: 'deleted' },
            },
            include: {
                pickup: true,
                delivery: true,
                assignee: {
                    select: {
                        uuid: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return {
            data: jobs,
            total: jobs.length,
        };
    }
    async getJobDetails(jobUuid) {
        const cacheKey = `details_${jobUuid}`;
        const cached = await this.redis.getJson(cacheKey);
        if (cached) {
            return {
                data: cached,
                source: 'cache',
            };
        }
        const job = await this.prisma.job.findUnique({
            where: { uuid: jobUuid },
            include: {
                pickup: true,
                delivery: true,
                assignee: {
                    select: {
                        uuid: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        await this.redis.setJson(cacheKey, job);
        return {
            data: job,
            source: 'database',
        };
    }
    async deleteJob(jobUuid) {
        const job = await this.prisma.job.findUnique({
            where: { uuid: jobUuid },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const updatedJob = await this.prisma.job.update({
            where: { uuid: jobUuid },
            data: { jobStatus: 'deleted' },
        });
        await this.redis.del(`details_${jobUuid}`);
        return {
            message: 'Job deleted successfully',
            data: updatedJob,
        };
    }
    async startJob(startJobDto) {
        const { jobUuid, lat, lng } = startJobDto;
        const job = await this.prisma.job.findUnique({
            where: { uuid: jobUuid },
            include: {
                pickup: true,
                delivery: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const updatedJob = await this.prisma.job.update({
            where: { uuid: jobUuid },
            data: {
                jobStatus: 'in_progress',
                delivery: {
                    update: {
                        atd: new Date(),
                    },
                },
            },
            include: {
                pickup: true,
                delivery: true,
            },
        });
        const detailsKey = `details_${jobUuid}`;
        await this.redis.setJson(detailsKey, updatedJob);
        const locationKey = `currentLoc_${jobUuid}`;
        await this.redis.setJson(locationKey, { lat, lng });
        return {
            message: 'Job started successfully',
            data: updatedJob,
        };
    }
    async finishJob(jobUuid, finishJobDto) {
        const job = await this.prisma.job.findUnique({
            where: { uuid: jobUuid },
            include: {
                delivery: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const ata = new Date();
        const atd = job.delivery?.atd;
        let actualDuration = null;
        if (atd) {
            const durationMs = ata.getTime() - atd.getTime();
            actualDuration = Math.floor(durationMs / (1000 * 60));
        }
        const updatedJob = await this.prisma.job.update({
            where: { uuid: jobUuid },
            data: {
                jobStatus: 'finished',
                delivery: {
                    update: {
                        ata,
                        actualDuration,
                    },
                },
            },
            include: {
                pickup: true,
                delivery: true,
                assignee: {
                    select: {
                        uuid: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
        });
        const locationKey = `currentLoc_${jobUuid}`;
        await this.redis.del(locationKey);
        const detailsKey = `details_${jobUuid}`;
        await this.redis.del(detailsKey);
        return {
            message: 'Job finished successfully',
            data: updatedJob,
        };
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map