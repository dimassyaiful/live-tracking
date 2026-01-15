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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis_1 = require("redis");
let RedisService = RedisService_1 = class RedisService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RedisService_1.name);
    }
    async onModuleInit() {
        const host = this.configService.get('REDIS_HOST', 'localhost');
        const port = this.configService.get('REDIS_PORT', 6379);
        const password = this.configService.get('REDIS_PASSWORD');
        this.client = (0, redis_1.createClient)({
            socket: {
                host,
                port,
            },
            ...(password && { password }),
        });
        this.client.on('error', (err) => {
            this.logger.error('Redis Client Error', err);
        });
        this.client.on('connect', () => {
            this.logger.log(`✓ Redis connected to ${host}:${port}`);
        });
        try {
            await this.client.connect();
            this.logger.log('Redis connection established successfully');
        }
        catch (error) {
            this.logger.error('Failed to connect to Redis', error);
            throw error;
        }
    }
    async onModuleDestroy() {
        if (this.client) {
            await this.client.disconnect();
            this.logger.log('Redis disconnected');
        }
    }
    isConnected() {
        return this.client?.isOpen ?? false;
    }
    async get(key) {
        return await this.client.get(key);
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.client.setEx(key, ttl, value);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async del(key) {
        return await this.client.del(key);
    }
    async exists(key) {
        return (await this.client.exists(key)) === 1;
    }
    async getJson(key) {
        const data = await this.get(key);
        return data ? JSON.parse(data) : null;
    }
    async setJson(key, value, ttl) {
        await this.set(key, JSON.stringify(value), ttl);
    }
    async getAllKeysAndValues() {
        const keys = await this.client.keys('*');
        const result = [];
        for (const key of keys) {
            const value = await this.get(key);
            if (value !== null) {
                result.push({ key, value });
            }
        }
        return result;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map