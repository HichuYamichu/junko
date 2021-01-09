import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('privileged')
export class Privileged {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', name: 'userId' })
  public userId!: string;
}
