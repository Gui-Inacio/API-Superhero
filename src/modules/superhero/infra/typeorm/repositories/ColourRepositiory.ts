import { injectable } from 'tsyringe';

import { Colour } from '../entities/Colour';

import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import {
  ColourSaveInput,
  IColourRepository,
} from '@/modules/superhero/repositories/IColourRepository';

@injectable()
export class ColourRepository
  extends AbstractTransactionRepository<Colour>
  implements IColourRepository
{
  private readonly colourRepository = AppDataSource.getRepository(Colour);

  async create(data: ColourSaveInput) {
    const colour = this.colourRepository.create(data);
    return await this.colourRepository.save(colour);
  }
  constructor(protected transaction: TransactionManager) {
    super(transaction, Colour);
  }
  async findById(id: string) {
    return await this.colourRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.colourRepository.find();
  }
  async update(data: Colour) {
    throw new Error('Method not implemented.');
  }
  async delete(id: string) {
    await this.colourRepository.delete(id);
  }
}
