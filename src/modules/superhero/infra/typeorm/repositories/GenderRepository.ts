import { injectable } from 'tsyringe';

import { Gender } from '../entities/Gender';

import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import {
  GenderSaveInput,
  GenderUpdate,
  IGenderRepository,
} from '@/modules/superhero/repositories/IGenderRepository';

@injectable()
export class GenderRepository
  extends AbstractTransactionRepository<Gender>
  implements IGenderRepository
{
  private readonly genderRepository = AppDataSource.getRepository(Gender);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Gender);
  }

  async create(data: GenderSaveInput) {
    const gender = this.genderRepository.create(data);
    return await this.genderRepository.save(gender);
  }
  async findById(id: string) {
    return await this.genderRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.genderRepository.find();
  }
  async update(data: GenderUpdate) {
    await this.genderRepository.update({ id: data.id }, data);
  }
  async delete(id: string) {
    await this.genderRepository.delete(id);
  }
}
