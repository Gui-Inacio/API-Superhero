import { inject, injectable } from 'tsyringe';

import { IPublisherRepository } from '../../repositories/IPublisherRepository';
import { CreatePublisher } from '../../dtos/CreatePublisherDTO';

@injectable()
export class CreatePublisherService {
  constructor(
    @inject('PublisherRepository')
    private readonly publisherRepository: IPublisherRepository,
  ) {}

  async execute(data: CreatePublisher) {
    return await this.publisherRepository.create(data);
  }
}
