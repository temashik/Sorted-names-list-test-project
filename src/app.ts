import { Server } from 'http';
import express, { Express, json, urlencoded } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import cookieParser from 'cookie-parser';
import { UserController } from './users/user.controller';
import { NameController } from './names/name.controller';
import path from 'path';
import consolidate from 'consolidate';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.NameController) private nameController: NameController,
		) {
		this.app = express();
		this.port = +(process.env.PORT || 8000);
	}

	useRoutes(): void {
		this.app.use('/', this.userController.router);
		this.app.use('/names', this.nameController.router);
	}

	useMiddleware(): void {
		this.app.use(json());
		this.app.use(cookieParser());
		this.app.use(urlencoded({ extended: false }));
		this.app.use(express.static(path.join(__dirname, 'front')));
		//this.app.engine('html', consolidate.ejs);
		this.app.set('views', __dirname + '/front/pages');
		this.app.set('view engine', 'html');
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.server = this.app.listen(this.port);
	}

	public close(): void {
		this.server.close;
	}
}