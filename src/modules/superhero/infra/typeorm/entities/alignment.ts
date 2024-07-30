import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alignment')
export class Alignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alignment: string;
}
