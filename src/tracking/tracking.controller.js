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
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tracking_service_1 = require("./tracking.service");
const push_location_dto_1 = require("./dto/push-location.dto");
let TrackingController = class TrackingController {
    constructor(trackingService) {
        this.trackingService = trackingService;
    }
    async pushLocation(pushLocationDto) {
        return await this.trackingService.pushLocation(pushLocationDto);
    }
    async getCurrentLocation(jobUuid) {
        return await this.trackingService.getCurrentLocation(jobUuid);
    }
};
exports.TrackingController = TrackingController;
__decorate([
    (0, common_1.Post)('push-location'),
    (0, swagger_1.ApiOperation)({
        summary: 'Push current location (updates Redis location key)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Location pushed successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [push_location_dto_1.PushLocationDto]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "pushLocation", null);
__decorate([
    (0, common_1.Get)(':jobUuid/location'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get current location of a job (from Redis)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Current location retrieved' }),
    __param(0, (0, common_1.Param)('jobUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getCurrentLocation", null);
exports.TrackingController = TrackingController = __decorate([
    (0, swagger_1.ApiTags)('Tracking'),
    (0, common_1.Controller)('tracking'),
    __metadata("design:paramtypes", [tracking_service_1.TrackingService])
], TrackingController);
//# sourceMappingURL=tracking.controller.js.map