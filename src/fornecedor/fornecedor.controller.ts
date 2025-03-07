import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { FornecedorService } from './fornecedor.service';
import { FornecedorEntity } from './fornecedor.entity';
import { ListaFornecedorDTO } from './dto/ListaFornecedor.dto';
import { CriaFornecedorDTO } from './dto/CriaFornecedor.dto';
import { AtualizaFornecedorDTO } from './dto/AtualizaFornecedor.dto';

@Controller('/fornecedores')
export class FornecedorController {
  constructor(private fornecedorService: FornecedorService) {}

  @Post()
  async criaFornecedor(@Body() dadosFornecedor: CriaFornecedorDTO) {
    const fornecedorEntity = new FornecedorEntity();
    fornecedorEntity.nome = dadosFornecedor.nome;
    fornecedorEntity.cnpj = dadosFornecedor.cnpj;
    fornecedorEntity.id = uuid();

    this.fornecedorService.criaFornecedor(fornecedorEntity);

    return {
      usuario: new ListaFornecedorDTO(
        fornecedorEntity.id,
        fornecedorEntity.nome,
        fornecedorEntity.cnpj,
      ),
      messagem: 'fornecedor criado com sucesso!',
    };
  }

  @Get()
  async listaFornecedores() {
    const fornecedoresSalvos = await this.fornecedorService.listFornecedores();

    return fornecedoresSalvos;
  }

  @Put('/:id')
  async atualizaFornecedor(
    @Param('id') id: string,
    @Body() novosDados: AtualizaFornecedorDTO,
  ) {
    const fornecedorAtualizado =
      await this.fornecedorService.atualizaFornecedor(id, novosDados);

    return {
      fornecedor: fornecedorAtualizado,
      messagem: 'Fornecedor atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeFornecedor(@Param('id') id: string) {
    const fornecedorRemovido = await this.fornecedorService.deletaFornecedor(
      id,
    );

    return {
      usuario: fornecedorRemovido,
      messagem: 'Fornecedor removido com sucesso!',
    };
  }
}
