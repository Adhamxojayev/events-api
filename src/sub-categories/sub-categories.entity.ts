import { Categories } from 'src/categories/categories.entity';
import { Events } from 'src/events/events.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sub_categories')
export class SubCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  subCategoryId: number;

  @Column({ type: 'varchar' })
  subCategoryName: string;

  @ManyToOne(
    () => Categories,
    (categories: Categories) => categories.subCategory,
  )
  category: Categories;

  @OneToMany(() => Events, (event: Events) => event.subCategory)
  events: Events[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
  categoryCategoryId: number;
}
