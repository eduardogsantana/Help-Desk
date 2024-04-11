import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CallsService } from './calls.service';
import { Call, Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decoratos';
import { CreateCallDto } from './dto/create-calls-dto';
import { UpdateCallDto } from './dto/update-calls-dto';

@Controller('calls')
export class CallsController {
    constructor(private readonly callsService: CallsService) {}

    @Post()
    @Roles(Role.USER)
    async createCall(@Body() createCallDto: CreateCallDto): Promise<Call> {
        // Usuários podem criar chamados
        return this.callsService.createCall(createCallDto);
    }

    @Get()
    @Roles(Role.TECHNICIAN, Role.MANAGER)
    async findAll(): Promise<Call[]> {
        // Técnicos e gerentes podem visualizar todos os chamados
        return this.callsService.findAll();
    }

    @Get(':id')
    @Roles(Role.USER, Role.TECHNICIAN, Role.MANAGER)
    async findOne(@Param('id') id: string): Promise<Call> {
        // Usuários, técnicos e gerentes podem visualizar um chamado específico
        return this.callsService.findOne(id);
    }

    @Put(':id')
    @Roles(Role.TECHNICIAN, Role.MANAGER)
    async updateCall(@Param('id') id: string, @Body() updateCallDto: UpdateCallDto): Promise<Call> {
        // Técnicos e gerentes podem atualizar um chamado
        return this.callsService.updateCall(id, updateCallDto);
    }

    @Delete(':id')
    @Roles(Role.MANAGER)
    async deleteCall(@Param('id') id: string): Promise<void> {
        // Apenas gerentes podem excluir um chamado
        await this.callsService.deleteCall(id);
    }

    @Put(':id/assign/:technicianId')
    @Roles(Role.MANAGER)
    async assignTechnician(
        @Param('id') id: string,
        @Param('technicianId') technicianId: string
    ): Promise<Call> {
        // Gerentes podem atribuir um técnico a um chamado
        return this.callsService.assignTechnician(id, technicianId);
    }
}
