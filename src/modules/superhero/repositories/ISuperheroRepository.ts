import { Superhero } from '../infra/typeorm/entities/Superhero';

import { IPageRequest } from '@/shared/dtos/IPageRequest';
import { IPageResponse } from '@/shared/dtos/IPageResponse';
import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type SuperheroSaveInput = StrictOmit<
  Superhero,
  'id' | 'createdAt' | 'updatedAt' | 'generateUuid'
>;
export type GetAllSuperhero = IPageRequest<{
  fullName?: string;
  superheroName?: string;
}> &
  Required<Pick<IPageRequest, 'page' | 'size'>>;
export type SuperheroUpdate = StrictOmit<
  Superhero,
  'createdAt' | 'updatedAt' | 'generateUuid' | 'heroAttributes'
>;

interface ISuperheroRepository {
  create(data: SuperheroSaveInput): Promise<Superhero>;
  findById(id: string): Promise<Superhero | null>;
  listAll(data: GetAllSuperhero): Promise<IPageResponse<Superhero>>;
  update(data: SuperheroUpdate): Promise<Superhero | void>;
  delete(id: string): Promise<void>;
}

export { ISuperheroRepository };
