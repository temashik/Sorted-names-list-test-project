import { injectable } from "inversify";
import getConnection from "../common/db.connection";
import { IUsersDatabaseRepository } from "./users.db.repository.interface";

@injectable()
export class UsersDatabaseRepository implements IUsersDatabaseRepository {
	async isUserExist(email: string): Promise<boolean> {
		const connection = await getConnection();
		const res = JSON.parse(JSON.stringify(await connection.execute('CALL isUserExist(?)', [email])))[0][0];
		connection.end();
		if (res.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	async getUser(email: string): Promise<any[]> {
		const connection = await getConnection();
		const res = JSON.parse(JSON.stringify(await connection.execute('CALL isUserExist(?)', [email])))[0][0];
		connection.end();
		return res;
	}

	async createUser(name: string, email: string, password: string): Promise<void> {
		const connection = await getConnection();
		await connection.execute('CALL createUser(?,?,?)', [name, email, password]);
		connection.end();
	}
}