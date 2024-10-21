import { inject, injectable } from 'tsyringe';

import { IAttributeRepository } from '../../repositories/IAttributeRepository';
import { CreateAttribute } from '../../dtos/CreateAttributeDTO';

import Conflict from '@/shared/errors/conflict';

@injectable()
export class CreateAttributeService {
  constructor(
    @inject('AttributeRepository')
    private readonly attributeRepository: IAttributeRepository,
  ) {}
  async execute(data: CreateAttribute) {
    const attribute = await this.attributeRepository.findByName(
      data.attributeName,
    );
    if (attribute) {
      throw new Conflict('This attribute already exists!');
    }
    return await this.attributeRepository.create(data);
  }
}
