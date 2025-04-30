import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto, User } from '@app/shared';
import { usersServiceCommands } from '@app/shared/commands/users-service';

@ApiTags('gateway')
@Controller('gateway')
export class GatewayController {
  constructor(@Inject('USERS_SERVICE') private readonly usersClient: ClientProxy) {}

  @Post('users')
  @ApiOperation({
    summary: 'Criar um novo usuário através do gateway',
    description: 'Cria um novo usuário no sistema.',
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersClient
      .send({ cmd: usersServiceCommands.createUser }, createUserDto)
      .toPromise();
  }

  @Get('users')
  @ApiOperation({ summary: 'Listar todos os usuários através do gateway' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  async findAll(): Promise<User[]> {
    return await this.usersClient.send({ cmd: 'find_all_users' }, {}).toPromise();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Buscar um usuário por ID através do gateway' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersClient.send({ cmd: 'find_one_user' }, +id).toPromise();
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Atualizar um usuário através do gateway' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersClient
      .send({ cmd: 'update_user' }, { id: +id, updateUserDto })
      .toPromise();
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Remover um usuário através do gateway' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersClient.send({ cmd: 'remove_user' }, +id).toPromise();
  }
}
