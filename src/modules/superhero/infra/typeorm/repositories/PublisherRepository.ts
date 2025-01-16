import { injectable } from 'tsyringe';
import { In } from 'typeorm';

import { Publisher } from '../entities/Publisher';

import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';
import {
  IPublisherRepository,
  PublisherSaveInput,
  PublisherUpdate,
} from '@/modules/superhero/repositories/IPublisherRepository';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';

@injectable()
export class PublisherRepository
  extends AbstractTransactionRepository<Publisher>
  implements IPublisherRepository
{
  private readonly publisherRepository = AppDataSource.getRepository(Publisher);
  constructor(protected transaction: TransactionManager) {
    super(transaction, Publisher);
  }
  async create(data: PublisherSaveInput) {
    const publisher = this.publisherRepository.create(data);
    return await this.publisherRepository.save(publisher);
  }

  async findById(id: string) {
    return await this.publisherRepository.findOne({ where: { id } });
  }

  async listAll() {
    return await this.publisherRepository.find();
  }

  async update(data: PublisherUpdate) {
    await this.publisherRepository.update({ id: data.id }, data);
  }
  async delete(id: string) {
    await this.publisherRepository.delete(id);
  }
  async findByIds(ids: string[]) {
    return await this.publisherRepository.find({
      where: {
        id: In(ids),
      },
      relations: {
        superhero: {
          heroAttributes: {
            attribute: true,
          },
        },
      },
      order: {
        superhero: {
          heroAttributes: {
            attribute: {
              attributeName: 'ASC',
            },
          },
        },
      },
    });
  }
}
