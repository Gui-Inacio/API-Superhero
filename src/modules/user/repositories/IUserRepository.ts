import { User } from '../infra/typeorm/entities/User';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type UserSaveImput = StrictOmit<
  User,
  'id' | 'created_at' | 'updated_at'
>;
export type UserUpdate = StrictOmit<
  User,
  'updated_at' | 'created_at' | 'password'
>;

export type UserUpdateInput = Pick<User, 'id' | 'password'>;

interface IUserRepository {
  create(data: UserSaveImput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  listAll(): Promise<User[] | null | User>;
  updatePassword(data: UserUpdateInput): Promise<void>;
  userLogin(email: string): Promise<User | null>;
  findByEmailAndNotId(email: string, id: string): Promise<User | null>;
  findByCpfAndNotId(cpf: string, id: string): Promise<User | null>;
  update(data: UserUpdate): Promise<User | void>;
  delete(id: string): Promise<User | void>;
}

export { IUserRepository };
