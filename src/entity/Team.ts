import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  teamID: number;

  @Column()
  teamName: string;

  @Column()
  teamColor: string;

  @Column()
  teamScore: string;

  @Column()
  teamDesc: string;

  // @ManyToMany(() => User, (user) => user.teams)
  // @JoinTable()
  // users: User[];
}
