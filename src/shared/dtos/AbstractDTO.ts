import { type ZodType, ZodError, z } from 'zod';

import { logger } from '../container/providers/logger';

import { ZodErrorMap } from './CustomErrorMap';

/**
 * @class
 *@description
 */
export abstract class AbstractDTO<Schema extends ZodType> {
  protected zodErrorMap: ZodErrorMap;
  protected data: z.infer<Schema>;

  public constructor(
    data: Record<string, unknown>,
    protected path: Array<Exclude<keyof z.infer<Schema>, symbol>> = [],
  ) {
    this.path = path;
    this.zodErrorMap = new ZodErrorMap();
    this.validate(data);
  }
  protected abstract rules(): Schema;

  public getAll(): z.infer<Schema> {
    return this.data;
  }

  private validate(data: unknown) {
    try {
      this.data = this.rules().parse(data, {
        errorMap: this.zodErrorMap.errorMap.bind(this.zodErrorMap),
        path: this.path,
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
