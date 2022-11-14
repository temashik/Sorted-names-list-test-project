import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { BaseContorller } from "../common/base.controller";
import { TYPES } from "../types";
import { IUserController } from "./user.controller.interface";
import { UserLoginDto, UserRegisterDto } from "./user.dto";
import { IUserService } from "./user.service.interface";
import 'dotenv/config';

@injectable()
export class UserController extends BaseContorller implements IUserController {
	constructor(@inject(TYPES.UserService) private userService: IUserService) {
		super();
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login }, 
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'get', func: this.loginEntry },
			{ path: '/register', method: 'get', func: this.registerEntry },
			{ path: '/', method: 'get', func: this.entryPoint },
		]);
	}

	public async login(req: Request<{}, {}, UserLoginDto>, res: Response): Promise<void> {
		if (!req.body.email || !req.body.password) {
			res.json({
				errorMessage: 'You must fill all fields',
			});
			return;
		}
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			res.json({
				errorMessage: 'Your email or password is invalid',
			});
		} else if (result.id) {
			const jwt = await this.userService.signJWT(req.body.email, result.id, process.env.SECRET || 'test');
			res.cookie('token', jwt);
			res.json({
				msg: 'You are logged in',
			});
		}
	}

	async register(req: Request<{}, {}, UserRegisterDto>, res: Response): Promise<void> {
		if (!req.body.name || !req.body.email || !req.body.password) {
			res.json({
				errorMessage: 'You must fill all fields',
			});
			return;
		}
		const result = await this.userService.createUser(req.body);
		if (!result) {
			res.json({
				errorMessage: 'This email already registered',
			});
			return;
		} else {
			res.json({
				msg: 'You successfully registered',
			});
		}
	}

	loginEntry(req: Request, res: Response): void {
		res.render('login.ejs', { title: 'Login' });
	}

	registerEntry(req: Request, res: Response): void {
		res.render('register.ejs', { title: 'Register' });
	}

	entryPoint(req: Request, res: Response): void {
		res.render('entry.ejs', { title: 'Welcome!' });
	}
}