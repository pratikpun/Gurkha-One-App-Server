import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Team } from "./Team";
import { User } from "./User";

@Entity()
export class FavouriteTeam {
  @PrimaryGeneratedColumn()
  favID: number;

  @Column()
  userID: String;

  @Column()
  teamName: String;

  // @ManyToOne(() => User, (user) => user.favouriteTeam)
  // user: User;
  //   @OneToMany(() => User, (user) => user.favouriteTeam)
  //   user: User[];
}
