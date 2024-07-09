import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const profileSchema = z.object({
  name: z.string(),
  email: z.string().email('Endereço de email inválido!'),
  cpf: z.string().regex(/^\d{11}$/, 'Invalid CPF format'),
  userId: z.string(),
});
export class ProfileDTO extends AbstractDTO<typeof profileSchema> {
  protected rules() {
    return profileSchema;
  }
}

export type ProfileData = z.infer<typeof profileSchema>;
