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
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    try{
      const usuarioEntity = new UsuarioEntity();
      usuarioEntity.email = dadosDoUsuario.email;
      usuarioEntity.senha = dadosDoUsuario.senha;
      usuarioEntity.nome = dadosDoUsuario.nome;
      usuarioEntity.id = uuid();

      this.usuarioService.criaUsuario(usuarioEntity);

      return {
        usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
        messagem: 'usuário criado com sucesso',
      };
    }
    catch(erro)
    {
      throw erro;
    }
  }

  @Get()
  async listUsuarios() {
    try{
      const usuariosSalvos = await this.usuarioService.listUsuarios();

      return usuariosSalvos;
    }
    catch(erro)
    {
      throw erro;
    }
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    try{
      const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
        id,
        novosDados,
      );

      return {
        usuario: usuarioAtualizado,
        messagem: 'usuário atualizado com sucesso',
      };
    }
    catch(erro)
    {
      throw erro;
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    try
    {
      const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

      return {
        usuario: usuarioRemovido,
        messagem: 'usuário removido com suceso',
      };
    }
    catch(erro)
    {
      throw erro;
    }
  }
}
