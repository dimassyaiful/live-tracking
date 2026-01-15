import { TrackingService } from './tracking.service';
import { PushLocationDto } from './dto/push-location.dto';
export declare class TrackingController {
    private trackingService;
    constructor(trackingService: TrackingService);
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
}
