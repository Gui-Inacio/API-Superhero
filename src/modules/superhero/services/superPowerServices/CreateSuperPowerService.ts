import { inject, injectable } from 'tsyringe';

import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';
import { CreateSuperPower } from '../../dtos/CreateSuperPowerDTO';

import Conflict from '@/shared/errors/conflict';

@injectable()
export class CreateSuperPowerService {
  constructor(
    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
  ) {}

  async execute(data: CreateSuperPower) {
    const existPowerName = await this.superPowerRepository.findPowerByName(
      data.powerName,
    );
    if (existPowerName) {
      throw new Conflict('This super power already exist!');
    }
    return await this.superPowerRepository.create(data);
  }
}
