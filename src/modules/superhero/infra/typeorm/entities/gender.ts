import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from './Superhero';

@Entity('gender')
export class Gender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: string;

  @OneToMany(() => Superhero, (superhero) => superhero.gender)
  superhero: Superhero[];
}
