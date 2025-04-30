import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'ID do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome do usuário' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Data de criação do usuário' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização do usuário' })
  @UpdateDateColumn()
  updatedAt: Date;
}
