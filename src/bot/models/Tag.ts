import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity('settings')
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  guild!: string;

  @Column()
  author!: string;

  @Column()
  name!: string;

  @Column()
  content!: string;
}
