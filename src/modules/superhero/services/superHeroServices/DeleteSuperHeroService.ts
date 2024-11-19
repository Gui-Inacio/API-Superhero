import { inject, injectable } from 'tsyringe';

import { ISuperheroRepository } from '../../repositories/ISuperheroRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class DeleteSuperHeroService {
  constructor(
    @inject('SuperheroRepository')
    private readonly superHeroRepository: ISuperheroRepository,
  ) {}

  async execute(id: string) {
    const superhero = await this.superHeroRepository.findById(id);
    if (!superhero) {
      throw new NotFound('Superhero not found!');
    }
    await this.superHeroRepository.delete(superhero.id);
  }
}
