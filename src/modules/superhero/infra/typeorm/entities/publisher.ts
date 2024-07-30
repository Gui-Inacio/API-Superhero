import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('publisher')
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  publisher_name: string;
}
