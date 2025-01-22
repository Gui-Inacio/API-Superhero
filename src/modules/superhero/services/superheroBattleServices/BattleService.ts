import { inject, injectable } from 'tsyringe';

import { IPublisherRepository } from '../../repositories/IPublisherRepository';
import { CreateSuperheroBattle } from '../../dtos/CreateSuperheroBattleDTO';
import { Publisher } from '../../infra/typeorm/entities/Publisher';

//import Conflict from '@/shared/errors/conflict';
import BadRequest from '@/shared/errors/badRequest';

@injectable()
export class BattleService {
  constructor(
    @inject('PublisherRepository')
    private readonly publisherRepository: IPublisherRepository,
  ) {}

  async execute(data: CreateSuperheroBattle) {
    const publishers = await this.publisherRepository.findByIds([
      data.publisherOne,
      data.publisherTwo,
    ]);

    if (publishers.length !== 2) {
      throw new BadRequest(
        'You need pass two publisher to create a SuperheroBattle',
      );
    }

    return await this.createPublisherBattle(publishers);
  }

  private async createPublisherBattle(publishers: Publisher[]) {
    const maxAttributes: {
      [key: string]: {
        superheroName: string;
        attributeValue: number;
        publisher: string;
      };
    } = {};

    publishers.map((publisher) =>
      publisher.superhero.forEach((superhero) => {
        superhero.heroAttributes?.forEach((attribute) => {
          const attributeName = attribute.attribute.attributeName;
          const attributeValue = attribute.attribute_value;

          if (
            !maxAttributes[attributeName] ||
            attributeValue > maxAttributes[attributeValue].attributeValue
          ) {
            maxAttributes[attributeName] = {
              superheroName: superhero.superheroName,
              attributeValue: attributeValue,
              publisher: publisher.publisher,
            };
          }
        });
      }),
    );

    return Object.keys(maxAttributes).map((attributeName) => {
      const { superheroName, attributeValue, publisher } =
        maxAttributes[attributeName];
      return `Vencedor no atributo ${attributeName} foi ${superheroName} com o valor de ${attributeValue} | (${publisher})`;
    });
  }
}
