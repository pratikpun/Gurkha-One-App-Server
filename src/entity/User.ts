import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
