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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jobs_service_1 = require("./jobs.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const finish_job_dto_1 = require("./dto/finish-job.dto");
let JobsController = class JobsController {
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async createJob(createJobDto) {
        return await this.jobsService.createJob(createJobDto);
    }
    async getAllJobs() {
        return await this.jobsService.getAllJobs();
    }
    async getJobDetails(jobUuid) {
        return await this.jobsService.getJobDetails(jobUuid);
    }
    async deleteJob(jobUuid) {
        return await this.jobsService.deleteJob(jobUuid);
    }
    async startJob(jobUuid, startJobDto) {
        return await this.jobsService.startJob({ jobUuid, ...startJobDto });
    }
    async finishJob(jobUuid, finishJobDto) {
        return await this.jobsService.finishJob(jobUuid, finishJobDto);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new job with pickup and delivery details',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Job created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all jobs (excluding deleted ones)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Jobs retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getAllJobs", null);
__decorate([
    (0, common_1.Get)(':jobUuid'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get job details (from Redis cache if available, otherwise from database)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Job details retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('jobUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobDetails", null);
__decorate([
    (0, common_1.Delete)(':jobUuid'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Soft delete a job (change status to deleted and remove from cache)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job deleted successfully' }),
    __param(0, (0, common_1.Param)('jobUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Post)(':jobUuid/start'),
    (0, swagger_1.ApiOperation)({
        summary: 'Start a job (change status to in_progress, cache details, store current location)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job started successfully' }),
    __param(0, (0, common_1.Param)('jobUuid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "startJob", null);
__decorate([
    (0, common_1.Post)(':jobUuid/finish'),
    (0, swagger_1.ApiOperation)({
        summary: 'Finish a job (change status to finished, record ATA, calculate actual duration)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job finished successfully' }),
    __param(0, (0, common_1.Param)('jobUuid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, finish_job_dto_1.FinishJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "finishJob", null);
exports.JobsController = JobsController = __decorate([
    (0, swagger_1.ApiTags)('Jobs'),
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map