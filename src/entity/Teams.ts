import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Teams {
  @PrimaryGeneratedColumn()
  teamID: number;

  @Column()
  teamName: string;

  @Column()
  teamColor: string;

  @Column()
  teamScore: string;
}
