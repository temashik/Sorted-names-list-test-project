import { JwtPayload } from 'jsonwebtoken';
import { UserLoginDto } from './user.dto';
import { UserRegisterDto } from './user.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<boolean>;
	validateUser: (dto: UserLoginDto) => Promise<User | null>;
	signJWT: (email: string, user_id: number, secret: string) => Promise<string>;
	verifyJWT: (JWT: string, secret: string) => string | JwtPayload | null;
}
