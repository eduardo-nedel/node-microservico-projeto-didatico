import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, User } from '@app/shared';
import { usersServiceCommands } from '@app/shared/commands/users-service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: usersServiceCommands.createUser })
  async create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_user' })
  async findOne(@Payload() id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_user' })
  async update(@Payload() data: { id: number; updateUserDto: UpdateUserDto }): Promise<User> {
    return await this.usersService.update(data.id, data.updateUserDto);
  }

  @MessagePattern({ cmd: 'remove_user' })
  async remove(@Payload() id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}
