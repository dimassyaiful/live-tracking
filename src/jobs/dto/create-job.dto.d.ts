export declare class PickupDto {
    address: string;
    lat: number;
    lng: number;
}
export declare class DeliveryDto {
    address: string;
    lat: number;
    lng: number;
    polyline?: string;
    distanceKm?: number;
    eta: string;
    etd: string;
    estimateDuration: number;
}
export declare class CreateJobDto {
    description?: string;
    assignedTo?: string;
    pickup: PickupDto;
    delivery: DeliveryDto;
}
