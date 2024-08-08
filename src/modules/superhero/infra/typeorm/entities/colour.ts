import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from './Superhero';

@Entity('colour')
export class Colour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  colour: string;

  @OneToMany(() => Superhero, (superhero) => superhero.colour)
  superhero: Superhero[];
}
