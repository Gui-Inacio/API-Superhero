import { inject, injectable } from 'tsyringe';

import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';
import { CreateSuperPower } from '../../dtos/CreateSuperPowerDTO';

@injectable()
export class CreateSuperPowerService {
  constructor(
    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
  ) {}

  async execute(data: CreateSuperPower) {
    return await this.superPowerRepository.create(data);
  }
}
