import { z } from 'zod';

import { AbstractDTO } from '../../../shared/dtos/AbstractDTO';

const createColourSchema = z.object({
  colour: z.string().min(1),
});

export class CreateColourDTO extends AbstractDTO<typeof createColourSchema> {
  protected rules() {
    return createColourSchema;
  }
}
export type CreateColour = z.infer<typeof createColourSchema>;
