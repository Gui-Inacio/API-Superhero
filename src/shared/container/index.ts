import { container } from 'tsyringe';

import { UserRepository } from '../../modules/user/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '../../modules/user/repositories/IUserRepository';

container.register<IUserRepository>('UserRepository', UserRepository);
