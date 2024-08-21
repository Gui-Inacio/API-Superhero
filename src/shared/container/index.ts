import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/user/repositories/IUserRepository';
import { UserRepository } from '../../modules/user/infra/typeorm/repositories/UserRepository';

import { IColourRepository } from '@/modules/superhero/repositories/IColourRepository';
import { ColourRepository } from '@/modules/superhero/infra/typeorm/repositories/ColourRepositiory';

container.register<IUserRepository>('UserRepository', UserRepository);
container.register<IColourRepository>('ColourRepository', ColourRepository);
