import { inject, injectable } from 'tsyringe';

import { IAttributeRepository } from '../../repositories/IAttributeRepository';
import { CreateAttribute } from '../../dtos/CreateAttributeDTO';

@injectable()
export class CreateAttributeService {
  constructor(
    @inject('AttributeRepository')
    private readonly attributeRepository: IAttributeRepository,
  ) {}
  async execute(data: CreateAttribute) {
    return await this.attributeRepository.create(data);
  }
}
