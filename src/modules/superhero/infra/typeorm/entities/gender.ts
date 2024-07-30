import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gender')
export class Gender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: string;
}
