import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from './Superhero';

@Entity('colour')
export class Colour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  colour: string;

  @OneToMany(() => Superhero, (superhero) => superhero.eyeColour)
  eyeColours: Superhero[];
  @OneToMany(() => Superhero, (superhero) => superhero.skinColour)
  skinColours: Superhero[];
  @OneToMany(() => Superhero, (superhero) => superhero.hairColour)
  hairColours: Superhero[];
}
