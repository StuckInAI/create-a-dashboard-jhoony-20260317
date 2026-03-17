import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  action!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int', nullable: true })
  userId!: number | null;

  @CreateDateColumn()
  createdAt!: Date;
}
