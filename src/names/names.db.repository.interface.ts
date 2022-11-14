export interface INamesDatabaseRepository {
	getNames: (userId: number) => Promise<any[]>;
	isNameExist: (name: string) => Promise<boolean>;
	createName: (name: string) => Promise<void>;
	changeName: (nameId: number, newName: string) => Promise<void>;
	changeRank: (userId: number, nameId: number, newRank: number) => Promise<void>;
	deleteName: (nameId: number) => Promise<void>;
}