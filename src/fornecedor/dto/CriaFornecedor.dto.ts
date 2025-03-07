import { IsNotEmpty, Length } from 'class-validator';

export class CriaFornecedorDTO {
  @IsNotEmpty({ message: 'Nome não pode estar vazio.' })
  nome: string;

  @IsNotEmpty({ message: 'CNPJ precisa ser informado.' })
  @Length(14, 14, { message: 'CNPJ deve ter 14 números.' })
  cnpj: string;
}
