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
exports.SimulationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tracking_service_1 = require("../tracking/tracking.service");
const DUMMY_DATA = {
    description: 'Deliver package to customer',
    assignedTo: 'fbcb4bb2-43da-40a2-ad81-e5187c2155ab',
    pickup: {
        address: 'Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29444, Indonesia',
        lat: 1.1258311,
        lng: 104.0515445,
    },
    delivery: {
        address: 'K Square Mall, Jl. Sudirman 2F-25, Sukajadi, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29444, Indonesia',
        lat: 1.1009878,
        lng: 104.037103,
        polyline: 'm{zEcqazRfzCfyA',
        distanceKm: 5.2,
        estimateDuration: 15,
        eta: new Date(new Date().getTime() + 15 * 60000),
        etd: new Date(new Date().getTime() + 30 * 60000),
    },
};
const ROUTE_COORDINATES = [
    {
        name: 'Graha Pena Batam Building (Titik Start A)',
        lat: 1.1258311,
        lng: 104.0515445,
    },
    { name: 'Monumen Welcome To Batam', lat: 1.1223017, lng: 104.0534285 },
    { name: 'Dataran Engku Putri', lat: 1.129271, lng: 104.0538747 },
    {
        name: 'Simpang Jalan Ahmad Yani & Raja H. Fisabilillah',
        lat: 1.1264,
        lng: 104.0452,
    },
    { name: 'Bundaran Tuah Madani', lat: 1.1341466, lng: 104.0434369 },
    { name: 'Dataran Madani Kota Batam', lat: 1.1254003, lng: 104.026376 },
    { name: 'Flyover Laluan Madani', lat: 1.1248, lng: 104.0258 },
    { name: 'Taman Dang Anom', lat: 1.1209722, lng: 104.0206642 },
    { name: 'Jalan Jenderal Sudirman', lat: 1.105, lng: 104.032 },
    {
        name: 'Guardian - K Square Mall (Titik Finish B)',
        lat: 1.1009878,
        lng: 104.037103,
    },
];
let SimulationService = class SimulationService {
    constructor(prismaService, trackingService) {
        this.prismaService = prismaService;
        this.trackingService = trackingService;
        this.activeSimulations = new Map();
    }
    async createSimulationJob() {
        const driver = await this.prismaService.user.findUnique({
            where: { email: 'driver@example.com' },
        });
        if (!driver) {
            return {
                success: false,
                message: 'Driver user with email driver@example.com not found',
            };
        }
        const job = await this.prismaService.job.create({
            data: {
                jobCode: `SIM-${Date.now()}`,
                description: DUMMY_DATA.description,
                jobStatus: 'planned',
                assignedTo: driver.uuid,
                pickup: {
                    create: {
                        lat: DUMMY_DATA.pickup.lat,
                        lng: DUMMY_DATA.pickup.lng,
                        address: DUMMY_DATA.pickup.address,
                    },
                },
                delivery: {
                    create: {
                        lat: DUMMY_DATA.delivery.lat,
                        lng: DUMMY_DATA.delivery.lng,
                        address: DUMMY_DATA.delivery.address,
                        polyline: DUMMY_DATA.delivery.polyline,
                        distanceKm: DUMMY_DATA.delivery.distanceKm,
                        estimateDuration: DUMMY_DATA.delivery.estimateDuration,
                        eta: DUMMY_DATA.delivery.eta,
                        etd: DUMMY_DATA.delivery.etd,
                    },
                },
            },
            include: {
                pickup: true,
                delivery: true,
            },
        });
        return {
            success: true,
            message: 'Simulation job created successfully with dummy data',
            jobId: job.uuid,
            job,
        };
    }
    async startSimulation(jobId, dto) {
        const job = await this.prismaService.job.findUnique({
            where: { uuid: jobId },
        });
        if (!job) {
            return {
                success: false,
                message: 'Job not found',
            };
        }
        await this.prismaService.job.update({
            where: { uuid: jobId },
            data: { jobStatus: 'in_progress' },
        });
        if (this.activeSimulations.has(jobId)) {
            clearInterval(this.activeSimulations.get(jobId));
        }
        let coordinateIndex = 0;
        const intervalDuration = (dto.intervalSeconds || 3) * 1000;
        const interval = setInterval(async () => {
            if (coordinateIndex < ROUTE_COORDINATES.length) {
                const coord = ROUTE_COORDINATES[coordinateIndex];
                await this.trackingService.pushLocationToSocket(jobId, {
                    lat: coord.lat,
                    lng: coord.lng,
                    timestamp: new Date().toISOString(),
                    address: coord.name,
                });
                console.log(`📍 [${jobId}] Location ${coordinateIndex + 1}/${ROUTE_COORDINATES.length}: ${coord.name}`);
                coordinateIndex++;
            }
            else {
                clearInterval(interval);
                this.activeSimulations.delete(jobId);
                await this.prismaService.job.update({
                    where: { uuid: jobId },
                    data: { jobStatus: 'finished' },
                });
                console.log(`✓ [${jobId}] Simulation completed!`);
            }
        }, intervalDuration);
        this.activeSimulations.set(jobId, interval);
        return {
            success: true,
            message: `Simulation started - pushing locations every ${dto.intervalSeconds || 3} seconds`,
            jobId,
            totalCoordinates: ROUTE_COORDINATES.length,
            intervalSeconds: dto.intervalSeconds || 3,
        };
    }
    async stopSimulation(jobId) {
        if (this.activeSimulations.has(jobId)) {
            clearInterval(this.activeSimulations.get(jobId));
            this.activeSimulations.delete(jobId);
            await this.prismaService.job.update({
                where: { uuid: jobId },
                data: { jobStatus: 'finished' },
            });
            return {
                success: true,
                message: 'Simulation stopped',
                jobId,
            };
        }
        return {
            success: false,
            message: 'No active simulation for this job',
        };
    }
};
exports.SimulationService = SimulationService;
exports.SimulationService = SimulationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tracking_service_1.TrackingService])
], SimulationService);
//# sourceMappingURL=simulation.service.js.map