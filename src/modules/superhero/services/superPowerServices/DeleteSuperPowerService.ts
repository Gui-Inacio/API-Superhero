import { inject, injectable } from 'tsyringe';

import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class DeleteSuperPower {
  constructor(
    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
  ) {}
  async execute(id: string) {
    const superPower = await this.superPowerRepository.findById(id);
    if (!superPower) {
      throw new NotFound('SuperPower not found! ');
    }
    await this.superPowerRepository.delete(id);
  }
}
