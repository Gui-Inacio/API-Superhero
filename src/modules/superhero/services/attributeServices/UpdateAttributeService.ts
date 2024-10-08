import { inject, injectable } from 'tsyringe';

import { IAttributeRepository } from '../../repositories/IAttributeRepository';
import { UpdateAttribute } from '../../dtos/UpdateAttributeDTO';

import { FindAttributeByIdService } from './FindAttributeByIdService';

@injectable()
export class UpdateAttributeService {
  constructor(
    @inject('AttributeRepository')
    private readonly attributeRepository: IAttributeRepository,
    private readonly findAttributeByIdService: FindAttributeByIdService,
  ) {}
  async execute(data: UpdateAttribute) {
    const attribute = await this.findAttributeByIdService.execute(data.id);
    await this.attributeRepository.update({
      id: attribute.id,
      attributeName: data.attributeName,
    });
    return await this.attributeRepository.findById(attribute.id);
  }
}
