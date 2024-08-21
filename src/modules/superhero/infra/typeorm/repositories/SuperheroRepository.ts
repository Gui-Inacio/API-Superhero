import { injectable } from 'tsyringe';

import { Superhero } from '../entities/Superhero';

import {
  ISuperheroRepository,
  SuperheroSaveInput,
} from '@/modules/superhero/repositories/ISuperheroRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import { AppDataSource } from '@/shared/infra/typeorm';

@injectable()
export class SuperheroRepository
  extends AbstractTransactionRepository<Superhero>
  implements ISuperheroRepository
{
  async create(data: SuperheroSaveInput) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }
  constructor(protected transaction: TransactionManager) {
    super(transaction, Superhero);
  }
  findById(id: string): Promise<Superhero | null> {
    throw new Error('Method not implemented.');
  }
  listAll(): Promise<Superhero[] | null | Superhero> {
    throw new Error('Method not implemented.');
  }
  update(data: Superhero): Promise<Superhero | void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Superhero | void> {
    throw new Error('Method not implemented.');
  }
  private readonly userRepository = AppDataSource.getRepository(Superhero);
}
