import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createHeroAttributeSchema = z.object({
  superhero: z.string().min(1),
  attribute: z.string().min(1),
  attribute_value: z.number(),
});

export class CreateHeroAttributeDTO extends AbstractDTO<
  typeof createHeroAttributeSchema
> {
  protected rules() {
    return createHeroAttributeSchema;
  }
}
export type CreateHeroAttribute = z.infer<typeof createHeroAttributeSchema>;
