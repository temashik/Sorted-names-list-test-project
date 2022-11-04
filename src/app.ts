import { Server } from 'http';
import express, { Express, json, urlencoded } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor() {
		this.app = express();
		this.port = +(process.env.PORT || 8000);
	}

	useRoutes(): void {
		
	}

	useMiddleware(): void {
		this.app.use(json());
		this.app.use(urlencoded({ extended: false }));
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