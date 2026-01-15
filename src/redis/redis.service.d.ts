import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private client;
    private readonly logger;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    isConnected(): boolean;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    del(key: string): Promise<number>;
    exists(key: string): Promise<boolean>;
    getJson<T>(key: string): Promise<T | null>;
    setJson<T>(key: string, value: T, ttl?: number): Promise<void>;
    getAllKeysAndValues(): Promise<{
        key: string;
        value: string;
    }[]>;
}
