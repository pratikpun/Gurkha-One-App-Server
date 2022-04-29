import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tournaments {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name: string;

  @Column()
  Year: Number;

  @Column()
  tournamentDesc: string;
}
