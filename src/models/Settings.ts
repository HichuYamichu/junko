import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryColumn()
  public guild!: string;

  @Column({ type: 'character varying', name: 'prefix', nullable: true })
  public prefix!: string | null;

  @Column({ type: 'character varying', name: 'preset', nullable: true })
  public preset!: string | null;

  @Column({ type: 'character varying', name: 'memberLog', nullable: true })
  public memberLog!: string | null;

  @Column({ type: 'character varying', name: 'messageLog', nullable: true })
  public messageLog!: string | null;

  @Column({ type: 'character varying', array: true, nullable: true })
  public blacklist!: string[] | null;
}
