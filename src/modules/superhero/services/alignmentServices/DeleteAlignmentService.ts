import { inject, injectable } from 'tsyringe';

import { IAlignmentRepository } from '../../repositories/IAlignmentRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class DeleteAlignmentService {
  constructor(
    @inject('AlignmentRepository')
    private readonly alignmentRepository: IAlignmentRepository,
  ) {}

  async execute(id: string) {
    const alignment = await this.alignmentRepository.findById(id);
    if (!alignment) {
      throw new NotFound('Alignment não encontrado!');
    }
    await this.alignmentRepository.delete(id);
  }
}
