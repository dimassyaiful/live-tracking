import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
