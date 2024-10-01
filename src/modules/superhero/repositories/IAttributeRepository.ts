import { Attribute } from '../infra/typeorm/entities/Attribute';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type AttributeSaveInput = StrictOmit<Attribute, 'id'>;

export type AttributeUpdate = StrictOmit<Attribute, 'heroAttributes'>;

interface IAttributeRepository {
  create(data: AttributeSaveInput): Promise<Attribute>;
  findById(id: string): Promise<Attribute | null>;
  listAll(): Promise<Attribute[]>;
  delete(id: string): Promise<void>;
  update(data: AttributeUpdate): Promise<void>;
}

export { IAttributeRepository };
