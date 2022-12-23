import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

enum EventsType {
  online = 'online',
  offline = 'offline',
}

enum StatusType {
  confirmation = 'confirmation',
  cancellation = 'cancellation',
  default = 'null',
}

@Entity('events')
export class Events extends BaseEntity {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column({ type: 'date' })
  eventDate: string;

  @Column({ type: 'varchar', length: 5 })
  eventHour: string;

  @Column({ type: 'enum', enum: EventsType, default: EventsType.online })
  eventType: EventsType;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.default })
  eventStatus: StatusType;

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

  @Column({ type: 'varchar' })
  categories: string;

  @Column({ type: 'varchar' })
  subCategories: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
