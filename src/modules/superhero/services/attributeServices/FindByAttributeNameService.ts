import { inject, injectable } from 'tsyringe';

import { IAttributeRepository } from '../../repositories/IAttributeRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindByNameService {
  constructor(
    @inject('AttributeService')
    private readonly attributeRepository: IAttributeRepository,
  ) {}
  async execute(attributeName: string) {
    const attribute = await this.attributeRepository.findByName(attributeName);
    if (!attribute) {
      throw new NotFound('Attribute not found.');
    }
    return attribute;
  }
}
