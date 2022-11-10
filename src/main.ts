import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { DatabaseService } from './common/database.service';
import { IDatabaseService } from './common/database.service.interface';
import { NameController } from './names/name.controller';
import { INameController } from './names/name.controller.interface';
import { NameService } from './names/name.service';
import { INameService } from './names/name.service.interface';
import { TYPES } from './types';
import { UserController } from './users/user.controller';
import { IUserController } from './users/user.controller.interface';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<INameController>(TYPES.NameController).to(NameController);
	bind<INameService>(TYPES.NameService).to(NameService);
	bind<IDatabaseService>(TYPES.DatabaseService).to(DatabaseService);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();