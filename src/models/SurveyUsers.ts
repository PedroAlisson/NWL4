import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { uuid } from "uuidv4";
import { User } from "./User";
import { Surveys } from "./Survey";

@Entity("surveys_users")
class SurveyUsers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  survey_id: string;

  @ManyToMany(() => Surveys)
  @JoinColumn({ name: "survey_id" })
  survey: Surveys;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveyUsers };
