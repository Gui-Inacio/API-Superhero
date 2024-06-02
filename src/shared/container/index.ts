import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/user/repositories/IUserRepository';
import { UserRepository } from '../../modules/user/infra/typeorm/repositories/UserRepository';

container.register<IUserRepository>('UserRepository', UserRepository);
