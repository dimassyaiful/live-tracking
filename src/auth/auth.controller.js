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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new user',
        description: 'Create a new user account with email and password',
    }),
    (0, swagger_1.ApiBody)({
        type: register_dto_1.RegisterDto,
        description: 'User registration details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully registered, returns JWT token',
        schema: {
            example: {
                user: {
                    uuid: '550e8400-e29b-41d4-a716-446655440000',
                    fullName: 'John Doe',
                    email: 'john@example.com',
                    status: 'active',
                    createdAt: '2025-12-02T10:00:00.000Z',
                },
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                expiresIn: 86400,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Validation error or email already exists',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Login user',
        description: 'Authenticate user with email and password, returns JWT token',
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.LoginDto,
        description: 'User login credentials',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully logged in, returns JWT token',
        schema: {
            example: {
                user: {
                    uuid: '550e8400-e29b-41d4-a716-446655440000',
                    fullName: 'John Doe',
                    email: 'john@example.com',
                    status: 'active',
                    createdAt: '2025-12-02T10:00:00.000Z',
                },
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                expiresIn: 86400,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid email or password',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map