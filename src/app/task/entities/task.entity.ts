import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityWithTimestamps } from '../../../project/db/common.entity';
import { TaskStatus } from '../../../project/common/contants';
import { User } from '../../user/models/user.entity';

@Entity({
  name: 'tasks',
})
export class Task extends BaseEntityWithTimestamps {
  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description?: string | null;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    nullable: false,
  })
  status: TaskStatus;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({
    name: 'user_id',
  })
  owner: User;
}
