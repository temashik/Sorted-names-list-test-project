import { injectable } from "inversify";
import { IDatabaseService } from "./database.service.interface";
import getConnection from "./db.connection";

@injectable()
export class DatabaseService implements IDatabaseService {
	async getNames(userId: number): Promise<any[]> {
		const connection = await getConnection();
		const res = JSON.parse(JSON.stringify(await connection.execute('CALL getNames(?)', [userId])))[0][0];
		connection.end();
		return res;
	}

	async nameDupe(name: string): Promise<JSON[]> {
		const connection = await getConnection();
		const res = JSON.parse(JSON.stringify(await connection.execute('CALL nameDupe(?)', [name])))[0][0];
		connection.end();
		return res;
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

	async existedUser(email: string): Promise<any[]> {
		const connection = await getConnection();
		const res = JSON.parse(JSON.stringify(await connection.execute('CALL isExisted(?)', [email])))[0][0];
		connection.end();
		return res;
	}

	async createUser(name: string, email: string, password: string): Promise<void> {
		const connection = await getConnection();
		await connection.execute('CALL createUser(?,?,?)', [name, email, password]);
		connection.end();
	}
}