import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService} from './users.service';
import { Role, User } from '@prisma/client';
import { Roles } from 'src/auth/roles.decoratos';
import { UpdateUserDto } from './dto/update-users-dto';
import { CreateUserDto } from './dto/create-users-dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Roles(Role.MANAGER, Role.TECHNICIAN, Role.USER)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        // Gerentes podem criar novos usuários
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @Roles(Role.MANAGER)
    async findAll(): Promise<User[]> {
        // Gerentes podem visualizar todos os usuários
        return this.userService.findAll();
    }

    @Get(':id')
    @Roles(Role.MANAGER, Role.TECHNICIAN, Role.USER)
    async findOne(@Param('id') id: string): Promise<User> {
        // Todos podem visualizar um usuário específico, desde que tenham acesso autorizado
        return this.userService.findOne(id);
    }

    @Put(':id')
    @Roles(Role.MANAGER)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        // Gerentes podem atualizar um usuário
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @Roles(Role.MANAGER)
    async deleteUser(@Param('id') id: string): Promise<void> {
        // Gerentes podem remover um usuário
        await this.userService.deleteUser(id);
    }
}
