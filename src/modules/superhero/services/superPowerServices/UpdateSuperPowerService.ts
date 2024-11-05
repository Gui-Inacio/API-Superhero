import { inject, injectable } from 'tsyringe';

import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';
import { UpdateSuperPower } from '../../dtos/UpdateSuperPowerDTO';

import { FindSuperPowerByIdService } from './FindSuperPowerByIdService';
import { FindPowerByNameService } from './FindByPowerNameService';

import Conflict from '@/shared/errors/conflict';

@injectable()
export class UpdateSuperPowerService {
  constructor(
    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
    private readonly findSuperPowerById: FindSuperPowerByIdService,
    private readonly findSuperPowerByName: FindPowerByNameService,
  ) {}
  async execute(data: UpdateSuperPower) {
    const superPower = await this.findSuperPowerById.execute(data.id);
    const superPowerExists = await this.findSuperPowerByName.execute(
      data.powerName,
    );
    if (superPowerExists && superPowerExists.id !== superPower.id) {
      throw new Conflict('Esse super power já está cadastrado!');
    }

    await this.superPowerRepository.update({
      id: superPower.id,
      powerName: data.powerName,
    });
    return await this.superPowerRepository.findById(superPower.id);
  }
}
