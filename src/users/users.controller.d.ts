import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<{
        uuid: string;
        email: string;
        fullName: string;
        status: string;
        createdAt: Date;
    }[]>;
}
