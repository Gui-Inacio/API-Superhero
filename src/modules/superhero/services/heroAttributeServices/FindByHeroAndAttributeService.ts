import { inject, injectable } from 'tsyringe';

import { IHeroAttributeRepository } from '../../repositories/IHeroAttributeRepository';

@injectable()
export class FindBySuperheroAndAttributeService {
  constructor(
    @inject('HeroAttributeRepository')
    private readonly heroAttributeRepository: IHeroAttributeRepository,
  ) {}

  async execute(superhero: string, attribute: string) {
    const heroAttribute =
      await this.heroAttributeRepository.findSuperHeroAndAttribute(
        superhero,
        attribute,
      );

    return heroAttribute;
  }
}
