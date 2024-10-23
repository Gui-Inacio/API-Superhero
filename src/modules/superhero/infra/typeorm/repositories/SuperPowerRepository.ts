import { injectable } from 'tsyringe';

import { Superpower } from '../entities/Superpower';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import {
  ISuperPowerRepository,
  SuperpowerSaveInput,
  SuperpowerUpdate,
} from '@/modules/superhero/repositories/ISuperPowerRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';

@injectable()
export class SuperPowerRepository
  extends AbstractTransactionRepository<Superpower>
  implements ISuperPowerRepository
{
  private readonly superPowerRepository =
    AppDataSource.getRepository(Superpower);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Superpower);
  }
  async create(data: SuperpowerSaveInput) {
    const superpower = this.superPowerRepository.create(data);
    return await this.superPowerRepository.save(superpower);
  }
  async findById(id: string) {
    return await this.superPowerRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.superPowerRepository.find();
  }
  async update(data: SuperpowerUpdate) {
    await this.superPowerRepository.update({ id: data.id }, data);
  }
  async delete(id: string) {
    await this.superPowerRepository.delete(id);
  }
}
