import { SubCategories } from 'src/sub-categories/sub-categories.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

// enum EventsType {
//   online = 'online',
//   offline = 'offline',
// }

// enum StatusType {
//   confirmation = 'confirmation',
//   cancellation = 'cancellation',
//   default = 'null',
// }

@Entity('events')
export class Events extends BaseEntity {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column({ type: 'date' })
  eventDate: Date;

  @Column({ type: 'varchar', length: 5 })
  eventHour: string;

  @Column({ type: 'varchar', default: 'online' })
  eventType: string;

  @Column({ type: 'varchar', default: 'null' })
  eventStatus: string;

  @Column({ type: 'varchar' })
  eventLink: string;

  @Column({ type: 'varchar', length: 32 })
  organizerName: string;

  @Column({ type: 'varchar', length: 32 })
  organizerProfes: string;

  @Column({ type: 'varchar', length: 32 })
  organizerTel: string;

  @Column({ type: 'varchar', length: 128 })
  eventDescription: string;

  @Column({ type: 'text' })
  eventImage: string;

  @Column({ type: 'text' })
  eventBody: string;

  @ManyToOne(
    () => SubCategories,
    (subCategories: SubCategories) => subCategories.events,
  )
  subCategory: SubCategories;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
