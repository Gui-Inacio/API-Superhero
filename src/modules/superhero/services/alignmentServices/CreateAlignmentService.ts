import { inject, injectable } from 'tsyringe';

import { IAlignmentRepository } from '../../repositories/IAlignmentRepository';
import { CreateAlignment } from '../../dtos/CreateAlignmentDTO';

@injectable()
export class CreateAlignmentService {
  constructor(
    @inject('AlignmentRepository')
    private readonly alignmentRepository: IAlignmentRepository,
  ) {}

  async execute(data: CreateAlignment) {
    return await this.alignmentRepository.create(data);
  }
}
