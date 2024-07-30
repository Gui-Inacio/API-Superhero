import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('colour')
export class Colour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  colour: string;
}
