import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Superhero } from './Superhero';
import { Attribute } from './Attribute';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntities';

@Entity('hero_attribute')
export class HeroAttribute extends AbstractEntity {
  @ManyToOne(() => Superhero, (superhero) => superhero.heroAttributes)
  @JoinColumn({ name: 'superhero_id' })
  superhero: Superhero;

  @ManyToOne(() => Attribute, (attribute) => attribute.heroAttributes)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @Column()
  attribute_value: number;
}
