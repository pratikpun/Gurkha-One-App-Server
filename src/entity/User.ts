import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { FavouriteTeam } from "./FavouriteTeam";
import { Team } from "./Team";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // @ManyToMany(() => Team, (team) => team.users)
  // @JoinTable()
  // teams: Team[];

  // @OneToMany(() => FavouriteTeam, (favouriteTeam) => favouriteTeam.user)
  // favouriteTeam: FavouriteTeam[];
  // @ManyToOne(() => FavouriteTeam, (favouriteTeam) => favouriteTeam.user)
  // favouriteTeam: FavouriteTeam;
  // @ManyToMany(() => Team, (team) => team.users)
  // @JoinTable()
  // teams: Team[];
}
