import { inject, injectable } from 'tsyringe';

import { IHeroAttributeRepository } from '../../repositories/IHeroAttributeRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindHeroAttributeByIdService {
  constructor(
    @inject('HeroAttributeRepository')
    private readonly heroAttributeRepository: IHeroAttributeRepository,
  ) {}

  async execute(id: string) {
    const heroAttribute = await this.heroAttributeRepository.findById(id);
    if (!heroAttribute) {
      throw new NotFound('HeroAttribute not found!');
    }
    return heroAttribute;
  }
}
