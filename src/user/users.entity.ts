import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  passwordHash: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;
}
