import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('superpower')
export class Superpower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'power_name' })
  powerName: string;
}
