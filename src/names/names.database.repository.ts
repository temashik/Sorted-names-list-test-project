import { injectable } from "inversify";
import getConnection from "../common/db.connection";
import { INamesDatabaseRepository } from "./names.db.repository.interface";

@injectable()
export class NamesDatabaseRepository implements INamesDatabaseRepository {
	async getNames(userId: number): Promise<any[]> {
		const connection = await getConnection();
		const res = JSON.parse(JSON.stringify(await connection.execute('CALL getNames(?)', [userId])))[0][0];
		connection.end();
		return res;
	}

	async isNameExist(name: string): Promise<boolean> {
		const connection = await getConnection();
		const res = JSON.parse(JSON.stringify(await connection.execute('CALL isNameExist(?)', [name])))[0][0];
		connection.end();
		if (res.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	async createName(name: string): Promise<void> {
		const connection = await getConnection();
		await connection.execute('CALL createName(?)', [name]);
		connection.end();
	}

	async changeName(nameId: number, newName: string): Promise<void> {
		const connection = await getConnection();
		await connection.execute('CALL changeName(?,?)', [nameId, newName]);
		connection.end();
	}

	async changeRank(userId: number, nameId: number, newRank: number): Promise<void> {
		const connection = await getConnection();
		await connection.execute('CALL changeRank(?,?,?)', [userId, nameId, newRank]);
		connection.end();
	}
	async deleteName(nameId: number): Promise<void> {
		const connection = await getConnection();
		await connection.execute('CALL deleteName(?)', [nameId]);
		connection.end();
	}
}