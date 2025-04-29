import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// O uso de PartialType(CreateUserDto) permite que o UpdateUserDto herde todas as propriedades do CreateUserDto, mas torna todas elas opcionais. 
// Isso é útil para atualizações parciais, onde nem todas as propriedades precisam ser fornecidas.
export class UpdateUserDto extends PartialType(CreateUserDto) {} 
