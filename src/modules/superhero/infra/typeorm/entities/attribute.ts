import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attribute')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  attribute_name: string;
}
