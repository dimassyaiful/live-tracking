import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { TrackingGateway } from './tracking.gateway';
import { PushLocationDto } from './dto/push-location.dto';
export declare class TrackingService {
    private prisma;
    private redis;
    private gateway;
    private readonly logger;
    constructor(prisma: PrismaService, redis: RedisService, gateway: TrackingGateway);
    pushLocation(pushLocationDto: PushLocationDto): Promise<{
        message: string;
        data: {
            jobUuid: string;
            lat: number;
            lng: number;
            timestamp: Date;
        };
    }>;
    getCurrentLocation(jobUuid: string): Promise<{
        data: unknown;
    }>;
    pushLocationToSocket(jobId: string, locationData: {
        lat: number;
        lng: number;
        timestamp: string;
        address?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
