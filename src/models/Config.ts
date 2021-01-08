import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config')
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', name: 'token' })
  public token!: string;

  @Column({ type: 'character varying', name: 'ownerId' })
  public ownerId!: string;

  @Column({ type: 'character varying', name: 'color' })
  public color!: string;

  @Column({ type: 'character varying', name: 'defaultPrefix' })
  public defaultPrefix!: string;

  @Column({ type: 'character varying', name: 'defaultPreset' })
  public defaultPreset!: string;

  @Column({ type: 'character varying', name: 'myriagURL' })
  public myriagURL!: string;
}
