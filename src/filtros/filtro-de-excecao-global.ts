import { ArgumentsHost, BadRequestException, ConflictException, ExceptionFilter, HttpAdapterHost, HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { QueryFailedError } from "typeorm";


export class FiltroDeExcecaoGlobal implements ExceptionFilter{
    constructor(private adapterHost: HttpAdapterHost){}

    catch(exception: unknown, host: ArgumentsHost) {
        
        console.log(exception);
        
        const { httpAdapter } = this.adapterHost;

        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();

        if (exception instanceof NotFoundException)
            {
                const status = (<HttpException>exception).getStatus();

                response
                .status(status)
                .json({
                  status: status,
                  parametros: request.params,
                  mensagem: exception.message,//'Usuário não encontrado para a operação!',
                  path: httpAdapter.getRequestUrl(request)
                });
            }
            else if (exception instanceof BadRequestException)
            {
                const status = (<HttpException>exception).getStatus();

                response
                .status(status)
                .json({
                  status: status,
                  parametros: request.params,
                  mensagem: exception.message,//'Usuário não encontrado! Requisição inválida!',
                  path: httpAdapter.getRequestUrl(request)
                });
            }
            else if (exception instanceof ConflictException)
            {
                const status = HttpStatus.BAD_REQUEST;

                response
                .status(status)
                .json({
                  status: status,
                  parametros: request.params,
                  mensagem: exception.message,//'Usuário já existe!',
                  path: httpAdapter.getRequestUrl(request)
                });
            }
            else if (exception instanceof QueryFailedError)
            {
                const status = HttpStatus.INTERNAL_SERVER_ERROR;

                response
                .status(status)
                .json({
                  status: status,
                  parametros: request.params,
                  mensagem: 'Erro no banco de dados: ' + (<QueryFailedError>exception).message,
                  path: httpAdapter.getRequestUrl(request)
                });
            }
            else 
            {
                const status = HttpStatus.INTERNAL_SERVER_ERROR;

                response
                .status(status)
                .json({
                  status: status,
                  parametros: request.params,
                  mensagem: 'Erro interno da aplicação!',
                  path: httpAdapter.getRequestUrl(request)
                });
            }
    }
    
}