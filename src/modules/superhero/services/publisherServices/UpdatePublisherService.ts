import { inject, injectable } from 'tsyringe';

import { IPublisherRepository } from '../../repositories/IPublisherRepository';
import { UpdatePublisher } from '../../dtos/UpdatePublisherDTO';

import { FindPublisherByIdService } from './FindPublisherByIdService';

@injectable()
export class UpdatePublisherService {
  constructor(
    @inject('PublisherRepository')
    private readonly publisherRepository: IPublisherRepository,
    private readonly findPublisherByIdService: FindPublisherByIdService,
  ) {}
  async execute(data: UpdatePublisher) {
    const publisher = await this.findPublisherByIdService.execute(data.id);

    await this.publisherRepository.update({
      id: publisher.id,
      publisher: data.publisher,
    });
    return await this.publisherRepository.findById(publisher.id);
  }
}
