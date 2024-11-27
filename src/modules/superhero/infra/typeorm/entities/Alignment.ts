import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from './Superhero';

@Entity('alignment')
export class Alignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alignment: string;

  @OneToMany(() => Superhero, (superhero) => superhero.alignment)
  superhero: Superhero[];
}
