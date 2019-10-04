import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryColumn()
  guild!: string;

  @Column()
  prefix!: string;

  @Column()
  preset!: string;

  @Column()
  memberLog!: string;

  @Column()
  messageLog!: string;

  @Column({ type: 'character varying', array: true})
  blacklist!: string[];
}
