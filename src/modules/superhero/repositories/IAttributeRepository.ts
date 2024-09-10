import { Attribute } from '../infra/typeorm/entities/Attribute';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type AttributeSaveInput = StrictOmit<Attribute, 'id'>;

//export type SuperheroUpdateInput = Pick<Superhero, 'id'>;

interface IAttributeRepository {
  create(data: AttributeSaveInput): Promise<Attribute>;
  findById(id: string): Promise<Attribute | null>;
  listAll(): Promise<Attribute[]>;
  delete(id: string): Promise<void>;
}

export { IAttributeRepository };
