import { injectable } from 'tsyringe';
import { ILike } from 'typeorm';

import { Superhero } from '../entities/Superhero';

import {
  GetAllSuperhero,
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
    return await this.superheroRepository.findOne({
      where: { id },
      relations: {
        gender: true,
        eyeColour: true,
        hairColour: true,
        skinColour: true,
        publisher: true,
        race: true,
        alignment: true,
        heroAttributes: true,
        superpowers: true,
      },
    });
  }

  async listAll(data: GetAllSuperhero) {
    const { filter, page, size } = data;

    const offset = (Number(page) - 1) * size;

    const superheroName = filter?.superheroName
      ? ILike(`%${filter.superheroName}%`)
      : undefined;
    const fullName = filter?.fullName
      ? ILike(`%${filter.fullName}%`)
      : undefined;

    const [result, count] = await this.superheroRepository.findAndCount({
      where: {
        superheroName,
        fullName,
      },
      select: {
        id: true,
        superheroName: true,
        fullName: true,
        createdAt: true,
      },
      relations: {
        gender: true,
        eyeColour: true,
        hairColour: true,
        skinColour: true,
        publisher: true,
        race: true,
        alignment: true,
        heroAttributes: true,
        superpowers: true,
      },
      take: size,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(count / size);

    return {
      currentPage: page,
      totalItens: count,
      totalPages: totalPages,
      content: result,
    };
  }

  async update(data: SuperheroUpdate) {
    await this.superheroRepository.save(data);
  }
  async delete(id: string) {
    await this.superheroRepository.delete(id);
  }
}
