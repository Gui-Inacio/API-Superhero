import { inject, injectable } from 'tsyringe';

import { ISuperheroRepository } from '../../repositories/ISuperheroRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindSuperHerosByPublisherService {
  constructor(
    @inject('SuperheroRepository')
    private readonly superHeroRepository: ISuperheroRepository,
  ) {}
  async execute(publisher: string) {
    const superheros =
      await this.superHeroRepository.findByPublisher(publisher);
    if (!superheros || superheros.length === 0) {
      throw new NotFound('No Superheros found for this publisher!');
    }
    return superheros;
  }
}
