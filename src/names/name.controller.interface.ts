import { Request, Response, NextFunction } from 'express';

export interface INameController {
	nameList: (req: Request, res: Response, next: NextFunction) => void;
	addName: (req: Request, res: Response, next: NextFunction) => void;
	editName: (req: Request, res: Response, next: NextFunction) => void;
	deleteName: (req: Request, res: Response, next: NextFunction) => void;
	moveRank: (req: Request, res: Response, next: NextFunction) => void;
}
