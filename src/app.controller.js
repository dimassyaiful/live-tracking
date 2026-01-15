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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const path = require("path");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    healthCheck() {
        return this.appService.getHealth();
    }
    async getRedisValue(key) {
        if (!key) {
            throw new common_1.BadRequestException('Key parameter is required');
        }
        return this.appService.getRedisValue(key);
    }
    async getAllRedisKeysAndValues() {
        return this.appService.getAllRedisKeysAndValues();
    }
    socket(res) {
        const filePath = path.join(__dirname, '..', 'public', 'socket.html');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(filePath);
    }
    socketLocal(res) {
        const filePath = path.join(__dirname, '..', 'public', 'socket-local.html');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(filePath);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Welcome message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Welcome message returned' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health check including Redis connection status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Health status returned' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('redis-value'),
    (0, swagger_1.ApiOperation)({ summary: 'Check Redis value by key' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Redis value returned' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Key parameter is required' }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - JWT token required',
    }),
    __param(0, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getRedisValue", null);
__decorate([
    (0, common_1.Get)('redis-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Redis keys and values' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All Redis keys and values returned',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllRedisKeysAndValues", null);
__decorate([
    (0, common_1.Get)('socket'),
    (0, swagger_1.ApiOperation)({ summary: 'WebSocket test client' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'WebSocket test HTML page' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "socket", null);
__decorate([
    (0, common_1.Get)('socket-local'),
    (0, swagger_1.ApiOperation)({ summary: 'WebSocket test client' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'WebSocket test HTML page' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "socketLocal", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map