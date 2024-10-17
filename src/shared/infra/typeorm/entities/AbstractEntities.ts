import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt?: Date;

  @BeforeInsert()
  generateUuid(): void {
    this.id = uuidv4();
  }
}
