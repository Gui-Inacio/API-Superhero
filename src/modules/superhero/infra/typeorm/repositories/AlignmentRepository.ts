import { injectable } from 'tsyringe';

import { Alignment } from '../entities/Alignment';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import {
  AlignmentSaveInput,
  AlignmentUpdate,
  IAlignmentRepository,
} from '@/modules/superhero/repositories/IAlignmentRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';

@injectable()
export class AlignmentRepository
  extends AbstractTransactionRepository<Alignment>
  implements IAlignmentRepository
{
  private readonly alignmentRepository = AppDataSource.getRepository(Alignment);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Alignment);
  }
  async create(data: AlignmentSaveInput) {
    const alignment = this.alignmentRepository.create(data);
    return await this.alignmentRepository.save(alignment);
  }
  async findById(id: string) {
    return await this.alignmentRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.alignmentRepository.find();
  }
  async update(data: AlignmentUpdate) {
    return await this.alignmentRepository.update({ id: data.id }, data);
  }
  async delete(id: string) {
    await this.alignmentRepository.delete(id);
  }
}
