import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { Historic, Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decoratos';
import { CreateHistoricDto } from './dto/create-historic-dto';
import { UpdateHistoricDto } from './dto/update-hisctoric-dto';

@Controller('historic')
export class HistoricController {
    constructor(private readonly historicService: HistoricService) {}

    @Post()
    @Roles(Role.TECHNICIAN, Role.MANAGER)
    async createHistoric(@Body() createHistoricDto: CreateHistoricDto): Promise<Historic> {
        // Técnicos e gerentes podem criar um registro de histórico
        return this.historicService.createHistoric(createHistoricDto);
    }

    @Get()
    @Roles(Role.MANAGER)
    async findAll(): Promise<Historic[]> {
        // Apenas gerentes podem visualizar todos os registros de histórico
        return this.historicService.findAll();
    }

    @Get(':id')
    @Roles(Role.USER, Role.TECHNICIAN, Role.MANAGER)
    async findOne(@Param('id') id: string): Promise<Historic> {
        // Usuários, técnicos e gerentes podem visualizar um registro de histórico específico
        return this.historicService.findOne(id);
    }

    @Put(':id')
    @Roles(Role.TECHNICIAN, Role.MANAGER)
    async updateHistoric(@Param('id') id: string, @Body() updateHistoricDto: UpdateHistoricDto): Promise<Historic> {
        // Técnicos e gerentes podem atualizar um registro de histórico existente
        return this.historicService.updateHistoric(id, updateHistoricDto);
    }

    @Patch(':id')
    @Roles(Role.TECHNICIAN, Role.MANAGER)
    async patchHistoric(@Param('id') id: string, @Body() updateHistoricDto: UpdateHistoricDto): Promise<Historic> {
        // Técnicos e gerentes podem fazer atualizações parciais em um registro de histórico existente
        return this.historicService.patchHistoric(id, updateHistoricDto);
    }

    @Delete(':id')
    @Roles(Role.MANAGER)
    async deleteHistoric(@Param('id') id: string): Promise<void> {
        // Apenas gerentes podem excluir um registro de histórico existente
        return this.historicService.deleteHistoric(id);
    }
}
