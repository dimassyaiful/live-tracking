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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobDto = exports.DeliveryDto = exports.PickupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PickupDto {
}
exports.PickupDto = PickupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Warehouse, Jl. Sudirman No. 123, Jakarta',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PickupDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: -6.2088,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PickupDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 106.8456,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PickupDto.prototype, "lng", void 0);
class DeliveryDto {
}
exports.DeliveryDto = DeliveryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Customer Office, Jl. Gatot Subroto No. 456, Jakarta',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: -6.225,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeliveryDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 106.799,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeliveryDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'enc:{wsiFljiiBrB~A...',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryDto.prototype, "polyline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5.2,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeliveryDto.prototype, "distanceKm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-01-15T03:00:00Z',
        description: 'Estimated Time of Arrival (ETA)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryDto.prototype, "eta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-01-15T03:15:00Z',
        description: 'Estimated Time of Departure (ETD)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryDto.prototype, "etd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15,
        description: 'Estimated duration in minutes',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeliveryDto.prototype, "estimateDuration", void 0);
class CreateJobDto {
}
exports.CreateJobDto = CreateJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Deliver package to customer',
        description: 'Job description',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'UUID of user assigned to this job',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "assignedTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pickup location details',
        type: PickupDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PickupDto),
    __metadata("design:type", PickupDto)
], CreateJobDto.prototype, "pickup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Delivery location details with time estimates',
        type: DeliveryDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DeliveryDto),
    __metadata("design:type", DeliveryDto)
], CreateJobDto.prototype, "delivery", void 0);
//# sourceMappingURL=create-job.dto.js.map