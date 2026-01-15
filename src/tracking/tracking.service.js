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
var TrackingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const tracking_gateway_1 = require("./tracking.gateway");
let TrackingService = TrackingService_1 = class TrackingService {
    constructor(prisma, redis, gateway) {
        this.prisma = prisma;
        this.redis = redis;
        this.gateway = gateway;
        this.logger = new common_1.Logger(TrackingService_1.name);
    }
    async pushLocation(pushLocationDto) {
        const { jobUuid, lat, lng } = pushLocationDto;
        const job = await this.prisma.job.findUnique({
            where: { uuid: jobUuid },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const locationKey = `currentLoc_${jobUuid}`;
        const locationData = { lat, lng, timestamp: new Date() };
        await this.redis.setJson(locationKey, locationData);
        if (this.gateway.server) {
            const roomName = `tracking_${jobUuid}`;
            this.gateway.server.to(roomName).emit('location_update', {
                jobId: jobUuid,
                location: locationData,
            });
            this.logger.log(`📡 Broadcast location update to room: ${roomName}`);
        }
        else {
            this.logger.warn('WebSocket server not available for broadcasting');
        }
        return {
            message: 'Location updated successfully',
            data: { jobUuid, lat, lng, timestamp: new Date() },
        };
    }
    async getCurrentLocation(jobUuid) {
        const job = await this.prisma.job.findUnique({
            where: { uuid: jobUuid },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const locationKey = `currentLoc_${jobUuid}`;
        const location = await this.redis.getJson(locationKey);
        return {
            data: location,
        };
    }
    async pushLocationToSocket(jobId, locationData) {
        if (this.gateway.server) {
            const roomName = `tracking_${jobId}`;
            this.gateway.server.to(roomName).emit('location_update', {
                jobId,
                location: locationData,
            });
            this.logger.log(`📡 Broadcast location update to room: ${roomName}`);
        }
        else {
            this.logger.warn('WebSocket server not available for broadcasting');
        }
        return {
            success: true,
            message: 'Location broadcasted successfully',
        };
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = TrackingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        tracking_gateway_1.TrackingGateway])
], TrackingService);
//# sourceMappingURL=tracking.service.js.map