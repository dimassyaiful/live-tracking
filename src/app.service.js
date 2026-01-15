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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis/redis.service");
let AppService = class AppService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    getHello() {
        return 'Welcome to Job Tracking Backend API!';
    }
    getHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            redis: this.redisService.isConnected() ? 'connected' : 'disconnected',
        };
    }
    deserializeValue(value) {
        try {
            return JSON.parse(value);
        }
        catch {
            return value;
        }
    }
    async getRedisValue(key) {
        const value = await this.redisService.get(key);
        if (value === null) {
            throw new common_1.NotFoundException(`Redis key "${key}" not found`);
        }
        const deserializedValue = this.deserializeValue(value);
        return {
            key,
            value: deserializedValue,
            type: typeof deserializedValue,
            isJson: typeof deserializedValue === 'object',
        };
    }
    async getAllRedisKeysAndValues() {
        const data = await this.redisService.getAllKeysAndValues();
        const deserializedData = data.map((item) => ({
            key: item.key,
            value: this.deserializeValue(item.value),
            isJson: typeof this.deserializeValue(item.value) === 'object',
        }));
        return {
            total: deserializedData.length,
            data: deserializedData,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], AppService);
//# sourceMappingURL=app.service.js.map