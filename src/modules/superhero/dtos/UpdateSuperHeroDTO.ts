/*superheroName
fullName
gender
eyecolour
haircolour
skincolour
publisher
race
alignment*/
import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateSuperheroSchema = z.object({
  id: z.string().uuid(),
  superheroName: z.string().min(1),
  fullName: z.string().min(1),
  gender: z.string(),
  eyeColour: z.string(),
  skinColour: z.string(),
  hairColour: z.string(),
  race: z.string(),
  publisher: z.string(),
  alignment: z.string(),
  superpowers: z.array(
    z.object({
      powerId: z.string().uuid(),
    }),
  ),
});

export class UpdateSuperheroDTO extends AbstractDTO<
  typeof updateSuperheroSchema
> {
  protected rules() {
    return updateSuperheroSchema;
  }
}

export type UpdateSuperhero = z.infer<typeof updateSuperheroSchema>;
