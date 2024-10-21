import { injectable } from 'tsyringe';

import { Attribute } from '../entities/Attribute';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import {
  AttributeSaveInput,
  AttributeUpdate,
  IAttributeRepository,
} from '@/modules/superhero/repositories/IAttributeRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';

@injectable()
export class AttributeRepository
  extends AbstractTransactionRepository<Attribute>
  implements IAttributeRepository
{
  private readonly attributeRepository = AppDataSource.getRepository(Attribute);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Attribute);
  }
  async create(data: AttributeSaveInput) {
    const attribute = this.attributeRepository.create(data);
    return await this.attributeRepository.save(attribute);
  }
  async findById(id: string) {
    return await this.attributeRepository.findOne({ where: { id } });
  }
  async listAll() {
    return await this.attributeRepository.find();
  }
  async update(data: AttributeUpdate) {
    await this.attributeRepository.update({ id: data.id }, data);
  }
  async delete(id: string) {
    await this.attributeRepository.delete(id);
  }
  async findByName(attributeName: string) {
    return await this.attributeRepository.findOne({
      where: { attributeName: attributeName },
    });
  }
}
