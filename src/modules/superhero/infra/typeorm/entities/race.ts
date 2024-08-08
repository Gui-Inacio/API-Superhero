import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from './Superhero';

@Entity('race')
export class Race {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  race: string;

  @OneToMany(() => Superhero, (superhero) => superhero.race)
  superhero: Superhero[];
}
