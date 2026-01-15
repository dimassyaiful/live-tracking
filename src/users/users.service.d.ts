import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(createUserDto: CreateUserDto): Promise<{
        uuid: string;
        email: string;
        fullName: string;
        createdAt: Date;
    }>;
    findOneByEmail(email: string): Promise<{
        uuid: string;
        email: string;
        fullName: string;
        status: string | null;
        password: string;
        createdAt: Date;
    }>;
    findOneById(uuid: string): Promise<{
        uuid: string;
        email: string;
        fullName: string;
        status: string;
        createdAt: Date;
    }>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    getAllUsers(): Promise<{
        uuid: string;
        email: string;
        fullName: string;
        status: string;
        createdAt: Date;
    }[]>;
}
