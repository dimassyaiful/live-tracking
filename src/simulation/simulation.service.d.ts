import { PrismaService } from '../prisma/prisma.service';
import { TrackingService } from '../tracking/tracking.service';
import { StartSimulationDto } from './dto/start-simulation.dto';
export declare class SimulationService {
    private readonly prismaService;
    private readonly trackingService;
    private activeSimulations;
    constructor(prismaService: PrismaService, trackingService: TrackingService);
    createSimulationJob(): Promise<{
        success: boolean;
        message: string;
        jobId?: undefined;
        job?: undefined;
    } | {
        success: boolean;
        message: string;
        jobId: string;
        job: {
            pickup: {
                uuid: string;
                createdAt: Date;
                address: string;
                lat: number;
                lng: number;
                jobUuid: string;
                updatedAt: Date;
            };
            delivery: {
                uuid: string;
                createdAt: Date;
                address: string;
                lat: number;
                lng: number;
                polyline: string | null;
                distanceKm: number | null;
                eta: Date | null;
                etd: Date | null;
                estimateDuration: number | null;
                jobUuid: string;
                updatedAt: Date;
                atd: Date | null;
                ata: Date | null;
                actualDuration: number | null;
            };
        } & {
            uuid: string;
            createdAt: Date;
            description: string | null;
            assignedTo: string | null;
            jobCode: string;
            jobStatus: import(".prisma/client").$Enums.JobStatus;
            updatedAt: Date;
        };
    }>;
    startSimulation(jobId: string, dto: StartSimulationDto): Promise<{
        success: boolean;
        message: string;
        jobId?: undefined;
        totalCoordinates?: undefined;
        intervalSeconds?: undefined;
    } | {
        success: boolean;
        message: string;
        jobId: string;
        totalCoordinates: number;
        intervalSeconds: number;
    }>;
    stopSimulation(jobId: string): Promise<{
        success: boolean;
        message: string;
        jobId: string;
    } | {
        success: boolean;
        message: string;
        jobId?: undefined;
    }>;
}
