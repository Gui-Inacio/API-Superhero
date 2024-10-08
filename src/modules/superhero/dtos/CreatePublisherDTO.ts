import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createPublisherSchema = z.object({
  publisher: z.string().min(1),
});

export class CreatePublisherDTO extends AbstractDTO<
  typeof createPublisherSchema
> {
  protected rules() {
    return createPublisherSchema;
  }
}

export type CreatePublisher = z.infer<typeof createPublisherSchema>;
