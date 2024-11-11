import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createSuperHeroSchema = z.object({
  superheroName: z.string().min(1),
  fullName: z.string().min(1),
  gender: z.string(),
  eyeColour: z.string(),
  skinColour: z.string(),
  hairColour: z.string(),
  race: z.string(),
  publisher: z.string(),
  alignment: z.string(),
  heroAttributes: z.string(),
  superpowers: z.string(),
});

export class CreateSuperHeroDTO extends AbstractDTO<
  typeof createSuperHeroSchema
> {
  protected rules() {
    return createSuperHeroSchema;
  }
}

export type CreateSuperHero = z.infer<typeof createSuperHeroSchema>;
