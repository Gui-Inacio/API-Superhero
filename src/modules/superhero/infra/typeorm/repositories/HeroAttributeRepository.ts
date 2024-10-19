import { injectable } from 'tsyringe';

import { HeroAttribute } from '../entities/HeroAttribute';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import {
  HeroAttributeSaveInput,
  HeroAttributeUpdate,
  IHeroAttributeRepository,
} from '@/modules/superhero/repositories/IHeroAttributeRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';

@injectable()
export class HeroAttributeRepositoy
  extends AbstractTransactionRepository<HeroAttribute>
  implements IHeroAttributeRepository
{
  private readonly heroAttributeRepository =
    AppDataSource.getRepository(HeroAttribute);
  constructor(protected transaction: TransactionManager) {
    super(transaction, HeroAttribute);
  }

  async create(data: HeroAttributeSaveInput) {
    const heroAttribute = this.heroAttributeRepository.create(data);
    return await this.heroAttributeRepository.save(heroAttribute);
  }

  async findById(id: string) {
    return await this.heroAttributeRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.heroAttributeRepository.find();
  }
  async findSuperHeroAndAttribute(superheroId: string, attributteId: string) {
    return this.heroAttributeRepository.findOne({
      where: {
        superhero: { id: superheroId },
        attribute: { id: attributteId },
      },
    });
  }

  async update(data: HeroAttributeUpdate) {
    await this.heroAttributeRepository.update({ id: data.id }, data);
  }

  async delete(id: string) {
    await this.heroAttributeRepository.delete(id);
  }
}
