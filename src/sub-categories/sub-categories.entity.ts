import { Categories } from 'src/categories/categories.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
  categoryCategoryId: number;
}
