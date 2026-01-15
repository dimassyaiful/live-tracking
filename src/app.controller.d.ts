import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    healthCheck(): {
        status: string;
        timestamp: string;
        redis: string;
    };
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
    socket(res: Response): void;
    socketLocal(res: Response): void;
}
