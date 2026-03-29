import {  Entity,  PrimaryGeneratedColumn,  Column,  CreateDateColumn, UpdateDateColumn } from 'typeorm';

export const UserRole = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("increment",{ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ACTIVE })
  active: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
