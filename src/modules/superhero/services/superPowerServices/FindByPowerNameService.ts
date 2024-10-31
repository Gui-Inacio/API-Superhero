import { inject, injectable } from 'tsyringe';

import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';

@injectable()
export class FindPowerByNameService {
  constructor(
    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
  ) {}

  async execute(powerName: string) {
    const superPower =
      await this.superPowerRepository.findPowerByName(powerName);
    return superPower;
  }
}
