import { SubCategories } from 'src/sub-categories/sub-categories.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({ type: 'varchar', length: 30 })
  categoryName: string;

  @OneToMany(
    () => SubCategories,
    (subcategories: SubCategories) => subcategories.category,
  )
  subCategory: SubCategories[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
