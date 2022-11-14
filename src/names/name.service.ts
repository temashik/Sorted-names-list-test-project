import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Name } from "./name.entity";
import { INameService } from "./name.service.interface";
import 'reflect-metadata';
import { INamesDatabaseRepository } from "./names.db.repository.interface";

@injectable()
export class NameService implements INameService {
	constructor(@inject(TYPES.NamesDatabaseRepository) private dbRepo: INamesDatabaseRepository) {}

	async showNames(userId: number): Promise<Name[]> {
		const names = await this.dbRepo.getNames(userId);
		const result = [];
		for (let elem of names) {
			result.push(new Name(elem.name, elem.rate, elem.id));
		}
		return result;
	}
	
	async createName(name: string): Promise<boolean> {
		const res = await this.dbRepo.isNameExist(name);
		if (res) {
			return false;
		} else {
			await this.dbRepo.createName(name);
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
				await this.dbRepo.changeName(nameId, newName);
			} 
			if(newRank) {
				await this.dbRepo.changeRank(userId, nameId, newRank);
			}
		}
	
	async removeName(nameId: number): Promise<void> {
		await this.dbRepo.deleteName(nameId);
	}
	async changeRank(userId: number, nameId: number, newRank: number): Promise<void> {
		await this.dbRepo.changeRank(userId, nameId, newRank);
	}
}