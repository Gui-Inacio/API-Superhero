import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';
const getAllSuperheroSchema = z.object({
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
  filter: z
    .object({
      superheroName: z.string().optional(),
      fullName: z.string().optional(),
    })
    .optional(),
});
export class GetAllSuperHeroDTO extends AbstractDTO<
  typeof getAllSuperheroSchema
> {
  protected rules() {
    return getAllSuperheroSchema;
  }
}

export type GetAllSuperHero = z.infer<typeof getAllSuperheroSchema>;
