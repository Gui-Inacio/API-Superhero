import { inject, injectable } from 'tsyringe';

import { IAlignmentRepository } from '../../repositories/IAlignmentRepository';
import { UpdateAlignment } from '../../dtos/UpdateAlignmentDTO';

import { FindAlignmentByIdService } from './FindAlignmentByIdService';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class UpdateAlignmentService {
  constructor(
    @inject('AlignmentRepository')
    private readonly alignmentRepository: IAlignmentRepository,
    private readonly findAlignmentByIdService: FindAlignmentByIdService,
  ) {}

  async execute(data: UpdateAlignment) {
    const alignment = await this.alignmentRepository.findById(data.id);
    if (!alignment) {
      throw new NotFound('Alignment Not Found!');
    }
    await this.alignmentRepository.update({
      id: alignment.id,
      alignment: data.alignment,
    });
    return await this.alignmentRepository.findById(alignment.id);
  }
}
