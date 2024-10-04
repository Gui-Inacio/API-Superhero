import { inject, injectable } from 'tsyringe';

import { IPublisherRepository } from '../../repositories/IPublisherRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class DeletePublisherService {
  constructor(
    @inject('PublisherRepository')
    private readonly publisherRepository: IPublisherRepository,
  ) {}
  async execute(id: string) {
    const publisher = await this.publisherRepository.findById(id);
    if (!publisher) {
      throw new NotFound('Publisher not found.');
    }
    await this.publisherRepository.delete(id);
  }
}
