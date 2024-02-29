import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'CASCADE' })
  taskList: Task[];

  @CreateDateColumn()
  crearedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
