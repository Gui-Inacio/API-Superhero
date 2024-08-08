import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from './Superhero';

@Entity('publisher')
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  publisher: string;

  @OneToMany(() => Superhero, (superhero) => superhero.publisher)
  superhero: Superhero[];
}
