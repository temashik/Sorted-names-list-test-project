export class Name {
	constructor(
		private readonly _name: string,
		private readonly _rate: number,
		private readonly _id: number,
	) {}

	get name(): string {
		return this._name;
	}

	get rate(): number {
		return this._rate;
	}

	get id(): number {
		return this._id;
	}
}
