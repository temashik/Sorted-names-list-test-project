export interface IDatabaseService {
	getNames: (userId: number) => Promise<any[]>;
	nameDupe: (name: string) => Promise<JSON[]>;
	createName: (name: string) => Promise<void>;
	changeName: (nameId: number, newName: string) => Promise<void>;
	changeRank: (userId: number, nameId: number, newRank: number) => Promise<void>;
	deleteName: (nameId: number) => Promise<void>;
	existedUser: (email:string) => Promise<any[]>;
	createUser: (name: string, email: string, password: string) => Promise<void>;
}