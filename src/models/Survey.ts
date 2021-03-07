import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { uuid } from "uuidv4";

@Entity("surveys")
class Surveys {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Surveys };
