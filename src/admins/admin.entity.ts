import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  adminId: number;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar' })
  password: string;
}
