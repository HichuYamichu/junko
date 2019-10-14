import { Entity, Column, PrimaryColumn } from 'typeorm';

export interface Settings {
  [key: string]: string | string[] | null | undefined;
  guild: string;
  prefix?: string | null | undefined;
  preset?: string | null | undefined;
  memberLog?: string | null | undefined;
  messageLog?: string | null | undefined;
  blacklist?: string[] | null | undefined;
}

@Entity('settings')
export class Settings {
  @PrimaryColumn()
  public guild!: string;

  @Column({ type: 'character varying', name: 'prefix', nullable: true })
  public prefix?: string | null;

  @Column({ type: 'character varying', name: 'preset', nullable: true })
  public preset?: string | null;

  @Column({ type: 'character varying', name: 'memberLog', nullable: true })
  public memberLog?: string | null;

  @Column({ type: 'character varying', name: 'messageLog', nullable: true })
  public messageLog?: string | null;

  @Column({ type: 'character varying', array: true, nullable: true })
  public blacklist?: string[] | null;
}
