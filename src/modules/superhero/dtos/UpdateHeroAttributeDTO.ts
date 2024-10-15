import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateHeroAttributeSchema = z.object({
  id: z.string(),
  attribute_value: z.string(),
  superhero: z.string(),
  attribute: z.string(),
});

export class UpdateHeroAttributeDTO extends AbstractDTO<
  typeof updateHeroAttributeSchema
> {
  protected rules() {
    return updateHeroAttributeSchema;
  }
}
export type UpdateHeroAttribute = z.infer<typeof updateHeroAttributeSchema>;
