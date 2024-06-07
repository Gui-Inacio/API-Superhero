import { User } from '../infra/typeorm/entities/User';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type UserSaveImput = StrictOmit<
  User,
  'id' | 'created_at' | 'updated_at'
>;

export type UserUpdateInput = Pick<User, 'id' | 'password'>;

interface IUserRepository {
  create(data: UserSaveImput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  listAll(): Promise<User[] | null | User>;
  updatePassword(data: UserUpdateInput): Promise<void>;
  userLogin(email: string): Promise<User | null>;
}

export { IUserRepository };
