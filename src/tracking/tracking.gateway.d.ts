import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    constructor();
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinJobTracking(client: Socket, data: {
        jobId: string;
    }): void;
}
