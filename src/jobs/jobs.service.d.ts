import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateJobDto } from './dto/create-job.dto';
import { StartJobDto } from './dto/start-job.dto';
import { FinishJobDto } from './dto/finish-job.dto';
export declare class JobsService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    private generateJobCode;
    createJob(createJobDto: CreateJobDto): Promise<{
        message: string;
        data: {
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
    getAllJobs(): Promise<{
        data: ({
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
            assignee: {
                uuid: string;
                email: string;
                fullName: string;
            };
        } & {
            uuid: string;
            createdAt: Date;
            description: string | null;
            assignedTo: string | null;
            jobCode: string;
            jobStatus: import(".prisma/client").$Enums.JobStatus;
            updatedAt: Date;
        })[];
        total: number;
    }>;
    getJobDetails(jobUuid: string): Promise<{
        data: unknown;
        source: string;
    }>;
    deleteJob(jobUuid: string): Promise<{
        message: string;
        data: {
            uuid: string;
            createdAt: Date;
            description: string | null;
            assignedTo: string | null;
            jobCode: string;
            jobStatus: import(".prisma/client").$Enums.JobStatus;
            updatedAt: Date;
        };
    }>;
    startJob(startJobDto: StartJobDto): Promise<{
        message: string;
        data: {
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
    finishJob(jobUuid: string, finishJobDto: FinishJobDto): Promise<{
        message: string;
        data: {
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
            assignee: {
                uuid: string;
                email: string;
                fullName: string;
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
}
