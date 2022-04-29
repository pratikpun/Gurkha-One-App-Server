import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UpcomingTournaments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  utName: string;

  @Column()
  utDate: string;

  @Column()
  utVenue: string;

  @Column()
  utDesc: string;
}
