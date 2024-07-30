import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('race')
export class Race {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  race: string;
}
