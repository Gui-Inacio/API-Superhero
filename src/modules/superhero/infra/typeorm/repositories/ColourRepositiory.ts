import { injectable } from 'tsyringe';
import { In } from 'typeorm';

import { Colour } from '../entities/Colour';

import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import {
  ColourSaveInput,
  ColourUpdate,
  IColourRepository,
} from '@/modules/superhero/repositories/IColourRepository';

@injectable()
export class ColourRepository
  extends AbstractTransactionRepository<Colour>
  implements IColourRepository
{
  private readonly colourRepository = AppDataSource.getRepository(Colour);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Colour);
  }

  async create(data: ColourSaveInput) {
    const colour = this.colourRepository.create(data);
    return await this.colourRepository.save(colour);
  }
  async findById(id: string) {
    return await this.colourRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.colourRepository.find();
  }
  async update(data: ColourUpdate) {
    await this.colourRepository.update({ id: data.id }, data);
  }
  async delete(id: string) {
    await this.colourRepository.delete(id);
  }
  async findByIds(ids: string[]) {
    return await this.colourRepository.find({
      where: { id: In(ids) },
    });
  }
}
