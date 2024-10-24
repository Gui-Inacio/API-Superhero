import { inject, injectable } from 'tsyringe';

import { IRaceRepository } from '../../repositories/IRaceRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class DeleteRaceService {
  constructor(
    @inject('RaceRepository')
    private readonly raceRepository: IRaceRepository,
  ) {}

  async execute(id: string) {
    const race = await this.raceRepository.findById(id);
    if (!race) {
      throw new NotFound('Race not found!');
    }

    await this.raceRepository.delete(id);
  }
}
