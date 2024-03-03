import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn({ name: 'task_id' })
  id: number;

  @Column()
  task: string;

  @Column()
  complite: boolean;

  // @ManyToOne(() => User, (user) => user.tasks)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @CreateDateColumn()
  crearedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
