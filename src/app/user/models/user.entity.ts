import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityWithTimestamps } from '../../../project/db/common.entity';
import { Task } from '../../task/entities/task.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntityWithTimestamps {
  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  first_name: string | null;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  last_name: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  picture: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  nickname: string | null;

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[];

  get full_name() {
    let fname = this.first_name;
    if (this.last_name) {
      fname += ' ' + this.last_name;
    }
    return fname;
  }

  constructor(data: Partial<User> = {}) {
    super();
    if (data && Object.keys(data).length) {
      Object.assign(this, data);
    }
  }
}
