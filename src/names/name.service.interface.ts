import { Name } from "./name.entity";

export interface INameService {
	showNames: (userId: number) => Promise<Name[]>;
	createName: (name: string) => Promise<boolean>;
	changeName: (nameId: number, userId: number, newName?: string, newRank?: number) => Promise<void>;
	removeName: (nameId: number) => Promise<void>;
	changeRank: (userId: number, nameId: number, newRank: number) => Promise<void>;
}