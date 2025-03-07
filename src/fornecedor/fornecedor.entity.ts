import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ProdutoEntity } from 'src/produto/produto.entity';

@Entity({ name: 'fornecedores' })
export class FornecedorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'cnpj', length: 14, nullable: false })
  cnpj: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => ProdutoEntity, (produtoEntity) => produtoEntity.fornecedor, {
    cascade: true,
    eager: true,
  })
  produtos: ProdutoEntity[];
}
