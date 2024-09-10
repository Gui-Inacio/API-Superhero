import { Publisher } from '../infra/typeorm/entities/Publisher';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type PublisherSaveInput = StrictOmit<Publisher, 'id'>;

//export type SuperheroUpdateInput = Pick<Superhero, 'id'>;

interface IPublisherRepository {
  create(data: PublisherSaveInput): Promise<Publisher>;
  findById(id: string): Promise<Publisher | null>;
  listAll(): Promise<Publisher[] | null | Publisher>;
  delete(id: string): Promise<Publisher | void>;
  update(data: Publisher): Promise<void>;
}

export { IPublisherRepository };
