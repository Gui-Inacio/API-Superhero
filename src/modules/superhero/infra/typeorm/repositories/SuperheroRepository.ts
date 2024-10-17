import { injectable } from 'tsyringe';

import { Superhero } from '../entities/Superhero';

import {
  ISuperheroRepository,
  SuperheroSaveInput,
  SuperheroUpdate,
} from '@/modules/superhero/repositories/ISuperheroRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import { AppDataSource } from '@/shared/infra/typeorm';

@injectable()
export class SuperheroRepository
  extends AbstractTransactionRepository<Superhero>
  implements ISuperheroRepository
{
  private readonly superheroRepository = AppDataSource.getRepository(Superhero);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Superhero);
  }

  async create(data: SuperheroSaveInput) {
    const superhero = this.superheroRepository.create(data);
    return await this.superheroRepository.save(superhero);
  }

  async findById(id: string) {
    return await this.superheroRepository.findOne({ where: { id } });
  }

  async listAll() {
    return await this.superheroRepository.find();
  }

  async update(data: SuperheroUpdate) {
    await this.superheroRepository.update({ id: data.id }, data);
  }
  async delete(id: string) {
    await this.superheroRepository.delete(id);
  }
}
