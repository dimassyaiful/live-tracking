import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            uuid: string;
            fullName: string;
            email: string;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        user: {
            uuid: string;
            fullName: string;
            email: string;
            status: string;
        };
        token: string;
    }>;
    validateToken(token: string): Promise<any>;
    private generateToken;
    validateUser(uuid: string): Promise<{
        uuid: string;
        email: string;
        fullName: string;
        status: string;
        createdAt: Date;
    }>;
}
