import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    try{
      const usuario = await this.buscaPorEmail(usuarioEntity.email);

      if (usuario !== null)
      {
        throw new ConflictException("Usuário já existe para este e-mail!");
      }
    }
    catch(erro)
    {
      if (erro instanceof NotFoundException){
        // Se não encontrou o usuário, procede com a inclusão
        await this.usuarioRepository.save(usuarioEntity);
      }
      else
      {
        // Se for outra excecao, joga o erro adiante;
        throw erro;
      }
    }    
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
    {
      throw new NotFoundException('Usuário não encontrado com este e-mail!');
    }

    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOne({ where: {id} });

    if (usuario === null)
    {
      throw new BadRequestException('Usuário informado não existe!');
    }

    await this.usuarioRepository.update(id, novosDados);
  }

  async deletaUsuario(id: string) {

    const usuario = await this.usuarioRepository.findOne({ where: {id} });

    if (usuario === null)
    {
      throw new BadRequestException('Usuário informado não existe!');
    }

    await this.usuarioRepository.delete(id);
  }
}
