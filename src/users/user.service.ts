import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserService } from './user.service.interface';
import 'dotenv/config';
import { User } from './user.entity';
import { UserLoginDto, UserRegisterDto } from './user.dto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { TYPES } from '../types';
import { IUsersDatabaseRepository } from './users.db.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.UsersDatabaseRepository) private dbRepo: IUsersDatabaseRepository) {}
	
	async createUser({ name, email, password }: UserRegisterDto): Promise<boolean> {
		const newUser = new User(name, email);
		const salt = Number(process.env.SALT) || 6;
		await newUser.setPassword(password, salt);
		const res = await this.dbRepo.isUserExist(newUser.email);
		if (res) {
			return false;
		} else {
			await this.dbRepo.createUser(newUser.name, newUser.email, newUser.password);
			console.log('Account added');
			return true;
		}
	}

	async validateUser({ email, password }: UserLoginDto): Promise<User | null> {
		const res = await this.dbRepo.getUser(email);
		if (res.length == 0) {
			return null;
		}
		const newUser = new User(
			res[0].name,
			res[0].email,
			res[0].password,
			res[0].id,
		);
		if (await newUser.comparePassword(password)) {
			return newUser;
		} else {
			return null;
		}
	}

	async signJWT(email: string, user_id: number, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email, 
					user_id,
					iat: Math.floor(Date.now()/1000)
				},
				secret,
				{
					algorithm: 'HS256'
				},
				(err, token) => {
					if(err) reject(err);
					else if(token) resolve(token);
			})
		});
	}

	verifyJWT(JWT: string, secret: string): string | JwtPayload | null {
		verify(JWT, secret, (err, payload) => {
			if(err) return null;
			else if(payload) return payload;
		})
		const verifyResult = verify(JWT, secret);
		return verifyResult;
	}
}