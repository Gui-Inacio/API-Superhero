import { inject, injectable } from 'tsyringe';

import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';

@injectable()
export class ListAllSuperPowerService {
  constructor(
    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
  ) {}
  async execute() {
    return await this.superPowerRepository.listAll();
  }
}
