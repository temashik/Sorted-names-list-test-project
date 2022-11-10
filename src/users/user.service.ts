import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserService } from './user.service.interface';
import 'dotenv/config';
import { User } from './user.entity';
import { UserLoginDto, UserRegisterDto } from './user.dto';
import { sign } from 'jsonwebtoken';
import { TYPES } from '../types';
import { IDatabaseService } from '../common/database.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.DatabaseService) private dbService: IDatabaseService) {}
	
	async createUser({ name, email, password }: UserRegisterDto): Promise<boolean> {
		const newUser = new User(name, email);
		const salt = Number(process.env.SALT) || 6;
		await newUser.setPassword(password, salt);
		const res = await this.dbService.existedUser(newUser.email);
		if (res.length > 0) {
			return false;
		} else {
			await this.dbService.createUser(newUser.name, newUser.email, newUser.password);
			console.log('Account added');
			return true;
		}
	}

	async validateUser({ email, password }: UserLoginDto): Promise<User | null> {
		const res = await this.dbService.existedUser(email);
		if (res[0].email == undefined) {
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
		// const user_id = (await this.dbService.existedUser(email))[0].id;
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
}