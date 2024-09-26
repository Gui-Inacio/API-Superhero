import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updatePublisherSchema = z.object({
  id: z.string(),
  publisher: z.string().min(1),
});

export class UpdatePublisherDTO extends AbstractDTO<
  typeof updatePublisherSchema
> {
  protected rules() {
    return updatePublisherSchema;
  }
}

export type UpdatePublisher = z.infer<typeof updatePublisherSchema>;
