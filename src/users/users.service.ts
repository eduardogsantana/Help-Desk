import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users-dto';
import { UpdateUserDto } from './dto/update-users-dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // Cria um novo usuário usando o DTO fornecido
        return this.prisma.user.create({
            data: createUserDto,
        });
    }

    async findAll(): Promise<User[]> {
        // Retorna todos os usuários
        return this.prisma.user.findMany();
    }

    async findOne(id: string): Promise<User> {
        // Busca um usuário por ID
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        // Atualiza um usuário usando o ID e o DTO fornecido
        await this.findOne(id); // Verifica se o usuário existe

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async deleteUser(id: string): Promise<void> {
        // Remove um usuário usando o ID fornecido
        await this.findOne(id); // Verifica se o usuário existe

        await this.prisma.user.delete({
            where: { id },
        });
    }
  
}
