import { RedisService } from './redis/redis.service';
export declare class AppService {
    private redisService;
    constructor(redisService: RedisService);
    getHello(): string;
    getHealth(): {
        status: string;
        timestamp: string;
        redis: string;
    };
    deserializeValue(value: string): unknown;
    getRedisValue(key: string): Promise<{
        key: string;
        value: unknown;
        type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
        isJson: boolean;
    }>;
    getAllRedisKeysAndValues(): Promise<{
        total: number;
        data: {
            key: string;
            value: unknown;
            isJson: boolean;
        }[];
    }>;
}
