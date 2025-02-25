import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FornecedorEntity } from './fornecedor.entity';
import { AtualizaFornecedorDTO } from './dto/AtualizaFornecedor.dto';
import { ListaFornecedorDTO } from './dto/ListaFornecedor.dto';

@Injectable()
export class FornecedorService{
  constructor(
    @InjectRepository(FornecedorEntity)
    private readonly fornecedorRepository: Repository<FornecedorEntity>,
  ) {}

  async criaFornecedor(fornecedorEntity: FornecedorEntity) {
    await this.fornecedorRepository.save(fornecedorEntity);
  }

  async listFornecedores() {
    const fornecedoresSalvos = await this.fornecedorRepository.find();
    const fornecedorLista = fornecedoresSalvos.map(
      (fornecedor) => new ListaFornecedorDTO(fornecedor.id, fornecedor.nome, fornecedor.cnpj),
    );
    return fornecedorLista;
  }

  async atualizaFornecedor(id: string, novosDados: AtualizaFornecedorDTO) {
    await this.fornecedorRepository.update(id, novosDados);
  }

  async deletaFornecedor(id: string) {
    await this.fornecedorRepository.delete(id);
  }

}