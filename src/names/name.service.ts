import { inject, injectable } from "inversify";
import { IDatabaseService } from "../common/database.service.interface";
import { TYPES } from "../types";
import { Name } from "./name.entity";
import { INameService } from "./name.service.interface";
import 'reflect-metadata';
import { JwtPayload, verify } from "jsonwebtoken";

@injectable()
export class NameService implements INameService {
	constructor(@inject(TYPES.DatabaseService) private dbService: IDatabaseService) {}

	async showNames(userId: number): Promise<Name[]> {
		const names = await this.dbService.getNames(userId);
		const result = [];
		for (let elem of names) {
			result.push(new Name(elem.name, elem.rate, elem.id));
		}
		return result;
	}
	
	async createName(name: string): Promise<boolean> {
		const res = await this.dbService.nameDupe(name);
		if (res.length > 0) {
			return false;
		} else {
			await this.dbService.createName(name);
			console.log('Name added');
			return true;
		}
	}
	
	async changeName(
		nameId: number, 
		userId: number, 
		newName?: string | undefined, 
		newRank?: number | undefined,
		): Promise<void> {
			if(newName) {
				await this.dbService.changeName(nameId, newName);
			} 
			if(newRank) {
				await this.dbService.changeRank(userId, nameId, newRank);
			}
		}
	
	async removeName(nameId: number): Promise<void> {
		await this.dbService.deleteName(nameId);
	}
	async changeRank(userId: number, nameId: number, newRank: number): Promise<void> {
		await this.dbService.changeRank(userId, nameId, newRank);
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