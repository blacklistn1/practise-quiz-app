import { Column, Entity } from 'typeorm';
import { BaseEntityWithTimestamps } from '../../../project/db/common.entity';

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

  get full_name() {
    return this.first_name + ' ' + this.last_name;
  }

  constructor(data: Partial<User> = {}) {
    super();
    if (data && Object.keys(data).length) {
      Object.assign(this, data);
    }
  }
}
