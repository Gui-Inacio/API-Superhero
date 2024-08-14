import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from './Superhero';

@Entity('alligment')
export class Allignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alligment: string;

  @OneToMany(() => Superhero, (superhero) => superhero.alligment)
  superhero: Superhero[];
}
