import { inject, injectable } from 'tsyringe';

import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';
import { UpdateSuperPower } from '../../dtos/UpdateSuperPowerDTO';

import { FindSuperPowerByIdService } from './FindSuperPowerByIdService';

@injectable()
export class UpdateSuperPowerService {
  constructor(
    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
    private readonly findSuperPowerById: FindSuperPowerByIdService,
  ) {}
  async execute(data: UpdateSuperPower) {
    const superPower = await this.findSuperPowerById.execute(data.id);

    await this.superPowerRepository.update({
      id: superPower.id,
      powerName: data.powerName,
    });
    return await this.superPowerRepository.findById(superPower.id);
  }
}
