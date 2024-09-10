import { injectable } from 'tsyringe';

import { Race } from '../entities/Race';

import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import {
  IRaceRepository,
  RaceSaveInput,
  RaceUpdate,
} from '@/modules/superhero/repositories/IRaceRepository';

@injectable()
export class RaceRepository
  extends AbstractTransactionRepository<Race>
  implements IRaceRepository
{
  private readonly raceRepository = AppDataSource.getRepository(Race);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Race);
  }

  async create(data: RaceSaveInput) {
    const race = this.raceRepository.create(data);
    return await this.raceRepository.save(race);
  }
  async findById(id: string) {
    return await this.raceRepository.findOne({ where: { id } });
  }

  async listAll() {
    return await this.raceRepository.find();
  }
  async update(data: RaceUpdate) {
    await this.raceRepository.update({ id: data.id }, data);
  }
  async delete(id: string) {
    await this.raceRepository.delete(id);
  }
}
