import { Entity, Column, PrimaryGeneratedColumn, Index, Unique } from 'typeorm';

@Entity('tags')
@Unique('guild_name', ['guild', 'name'])
export class Tag {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Index()
  @Column()
  public guild!: string;

  @Column()
  public author!: string;

  @Index()
  @Column()
  public name!: string;

  @Column()
  public content!: string;
}
