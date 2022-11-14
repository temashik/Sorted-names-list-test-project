import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { BaseContorller } from "../common/base.controller";
import { TYPES } from "../types";
import { INameController } from "./name.controller.interface";
import { INameService } from "./name.service.interface";
import 'dotenv/config';
import url from 'url';
import { IUserService } from "../users/user.service.interface";

@injectable()
export class NameController extends BaseContorller implements INameController {
	constructor(
		@inject(TYPES.NameService) private nameService: INameService,
		@inject(TYPES.UserService) private userService: IUserService,
		) {
		super();
		this.bindRoutes([
		{ path: '/', method: 'get', func: this.namesList }, 
		{ path: '/addName', method: 'post', func: this.addName },
		{ path: '/editName', method: 'post', func: this.editName },
		{ path: '/deleteName', method: 'post', func: this.deleteName },
		{ path: '/changeRank', method: 'post', func: this.moveRank },
		{ path: '/addNameForm', method: 'get', func: this.addEntry },
		{ path: '/editNameForm', method: 'get', func: this.editEntry },
		{ path: '/logout', method: 'post', func: this.logout },
	]);
	}
	async namesList(req: Request, res: Response): Promise<void> {
		const payload = this.userService.verifyJWT(req.cookies.token, process.env.SECRET || 'test');
		const names = await this.nameService.showNames(JSON.parse(JSON.stringify(payload)).user_id);
			res.render('names-list.ejs', {
				title: 'Names list',
				names,
			});
	}
	async addName(req: Request, res: Response): Promise<void> {
		if(!req.body.name) {
			res.json({
				errorMessage: 'Name field is empty',
			});
			return;
		}
		const result = await this.nameService.createName(req.body.name);
		if (!result) {
			res.json({
				errorMessage: 'This name is already exists. New name has not added.',
			});
		} else res.sendStatus(200);
	}
	async editName(req: Request, res: Response): Promise<void> {
		if(!req.body.newName && !req.body.newRank) {
			res.json({
				errorMessage: 'Enter at least one value to change',
			});
			return;
		}
		const payload = this.userService.verifyJWT(req.cookies.token, process.env.SECRET || 'test');
		const userId = JSON.parse(JSON.stringify(payload)).user_id;
		await this.nameService.changeName(req.body.id, userId, req.body.newName, req.body.newRank);
		res.sendStatus(200);
	}
	async deleteName(req: Request, res: Response): Promise<void> {
		if(!req.body.id) {
			res.json({
				errorMessage: 'Select item to delete',
			});
			return;
		}
		await this.nameService.removeName(req.body.id);
		res.sendStatus(200);
	}
	async moveRank(req: Request, res: Response): Promise<void> {
		const payload = this.userService.verifyJWT(req.cookies.token, process.env.SECRET || 'test');
		const userId = JSON.parse(JSON.stringify(payload)).user_id;
		await this.nameService.changeRank(userId, req.body.id, req.body.rank);
		res.sendStatus(200);
	}
	addEntry(req: Request, res: Response): void {
		res.render('add.ejs', { title: 'Add name' });
	}
	editEntry(req: Request, res: Response): void {
		const queryObject = url.parse(req.url, true).query;
		res.render('edit.ejs', { title: 'Edit name', id: queryObject.id });
	}
	logout(req: Request, res: Response): void {
		res.clearCookie('token');
		res.end()
	}
}