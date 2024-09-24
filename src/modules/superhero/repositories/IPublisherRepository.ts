import { Publisher } from '../infra/typeorm/entities/Publisher';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type PublisherSaveInput = StrictOmit<Publisher, 'id' | 'superhero'>;

export type PublisherUpdateInput = StrictOmit<Publisher, 'superhero'>;

interface IPublisherRepository {
  create(data: PublisherSaveInput): Promise<Publisher>;
  findById(id: string): Promise<Publisher | null>;
  listAll(): Promise<Publisher[]>;
  delete(id: string): Promise<void>;
  update(data: Publisher): Promise<void>;
}

export { IPublisherRepository };
