import { Column, Entity, OneToMany } from 'typeorm';

import { HeroAttribute } from './HeroAttribute';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntities';

@Entity('attribute')
export class Attribute extends AbstractEntity {
  @Column({ name: 'attribute_name' })
  attributeName: string;

  @OneToMany(() => HeroAttribute, (heroAttribute) => heroAttribute.attribute)
  heroAttributes: HeroAttribute[];
  //add a coment
}
