export interface IUsersDatabaseRepository {
	isUserExist: (email:string) => Promise<boolean>;
	getUser: (email:string) => Promise<any[]>;
	createUser: (name: string, email: string, password: string) => Promise<void>;
}