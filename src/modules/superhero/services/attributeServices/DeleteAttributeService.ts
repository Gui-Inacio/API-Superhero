import { inject, injectable } from 'tsyringe';

import { IAttributeRepository } from '../../repositories/IAttributeRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class DeleteAttributeService {
  constructor(
    @inject('AttributeRepository')
    private readonly attributeRepository: IAttributeRepository,
  ) {}

  async execute(id: string) {
    const attribute = await this.attributeRepository.findById(id);
    if (!attribute) {
      throw new NotFound('Attribute not found');
    }
    await this.attributeRepository.delete(id);
  }
}
