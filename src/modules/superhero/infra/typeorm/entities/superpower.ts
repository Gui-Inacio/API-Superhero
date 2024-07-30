import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('superpower')
export class Superpower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  power_name: string;
}
