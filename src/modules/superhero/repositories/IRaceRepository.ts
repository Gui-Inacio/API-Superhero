import { Race } from '../infra/typeorm/entities/Race';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type RaceSaveInput = StrictOmit<Race, 'id'>;

//export type SuperheroUpdateInput = Pick<Superhero, 'id'>;

interface IRaceRepository {
  create(data: RaceSaveInput): Promise<Race>;
  findById(id: string): Promise<Race | null>;
  listAll(): Promise<Race[] | null | Race>;
  delete(id: string): Promise<Race | void>;
  update(data: Race): Promise<Race | void>;
}

export { IRaceRepository };
