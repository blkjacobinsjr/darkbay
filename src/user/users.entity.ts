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
  id!: number;

  @Column({ type: 'text', unique: true, nullable: false })
  username!: string;

  @Column()
  @Exclude()
  passwordHash!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
