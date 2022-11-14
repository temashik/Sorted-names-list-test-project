import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { NameController } from './names/name.controller';
import { INameController } from './names/name.controller.interface';
import { NameService } from './names/name.service';
import { INameService } from './names/name.service.interface';
import { NamesDatabaseRepository } from './names/names.database.repository';
import { INamesDatabaseRepository } from './names/names.db.repository.interface';
import { TYPES } from './types';
import { UserController } from './users/user.controller';
import { IUserController } from './users/user.controller.interface';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import { UsersDatabaseRepository } from './users/users.database.repository';
import { IUsersDatabaseRepository } from './users/users.db.repository.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<INameController>(TYPES.NameController).to(NameController);
	bind<INameService>(TYPES.NameService).to(NameService);
	bind<IUsersDatabaseRepository>(TYPES.UsersDatabaseRepository).to(UsersDatabaseRepository);
	bind<INamesDatabaseRepository>(TYPES.NamesDatabaseRepository).to(NamesDatabaseRepository);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();