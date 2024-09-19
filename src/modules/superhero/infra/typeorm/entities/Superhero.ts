import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Gender } from './Gender';
import { Colour } from './Colour';
import { Race } from './Race';
import { Publisher } from './Publisher';
import { Alignment } from './Alignment'; //caso der algo errado, retornar nome da variavel para Alignment
import { Superpower } from './Superpower';
import { HeroAttribute } from './HeroAttribute';

import { AbstractEntity } from '@/shared/infra/typeorm/entities/AbstractEntities';

@Entity('superhero')
export class Superhero extends AbstractEntity {
  @Column({ name: 'superhero_name' })
  superheroName: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @ManyToOne(() => Gender, (gender) => gender.superhero, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @ManyToOne(() => Colour, (colour) => colour.superhero, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'colour_id' })
  colour: Colour;

  @ManyToOne(() => Race, (race) => race.superhero, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'race_id' })
  race: Race;

  @ManyToOne(() => Publisher, (publisher) => publisher.superhero, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @ManyToOne(() => Alignment, (alignment) => alignment.superhero, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'alligment_id' })
  alignment: Publisher;

  @OneToMany(() => HeroAttribute, (heroAttribute) => heroAttribute.superhero)
  heroAttributes: HeroAttribute[];

  @ManyToMany(() => Superpower, { cascade: true })
  @JoinTable({
    name: 'hero_power',
    joinColumn: { name: 'superhero_id' },
    inverseJoinColumn: { name: 'power_id' },
  })
  superpowers: Superpower[];
}
