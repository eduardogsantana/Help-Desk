import { Injectable, NotFoundException } from '@nestjs/common';
import { Historic } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHistoricDto } from './dto/create-historic-dto';
import { UpdateHistoricDto } from './dto/update-hisctoric-dto';

@Injectable()
export class HistoricService {
    constructor(private prisma: PrismaService) {}

    // Método para criar um novo registro de histórico
    async createHistoric(createHistoricDto: CreateHistoricDto): Promise<Historic> {
        return this.prisma.historic.create({
            data: createHistoricDto,
        });
    }

    // Método para listar todos os registros de histórico
    async findAll(): Promise<Historic[]> {
        return this.prisma.historic.findMany({
            include: {
                call: true,
                user: true,
            },
        });
    }

    // Método para encontrar um registro de histórico por ID
    async findOne(id: string): Promise<Historic> {
        const historic = await this.prisma.historic.findUnique({
            where: { id },
            include: {
                call: true,
                user: true,
            },
        });

        if (!historic) {
            throw new NotFoundException(`Registro histórico com ID ${id} não encontrado`);
        }

        return historic;
    }

    // Método para atualizar um registro de histórico usando PUT (atualização completa)
    async updateHistoric(id: string, updateHistoricDto: UpdateHistoricDto): Promise<Historic> {
        const historic = await this.findOne(id); // Verifica se o registro existe

        return this.prisma.historic.update({
            where: { id },
            data: updateHistoricDto,
        });
    }

    // Método para atualizar parcialmente um registro de histórico usando PATCH (atualização parcial)
    async patchHistoric(id: string, updateHistoricDto: UpdateHistoricDto): Promise<Historic> {
        const historic = await this.findOne(id); // Verifica se o registro existe

        return this.prisma.historic.update({
            where: { id },
            data: updateHistoricDto,
        });
    }

    // Método para excluir um registro de histórico
    async deleteHistoric(id: string): Promise<void> {
        // Verifica se o registro existe antes de tentar excluir
        const historic = await this.findOne(id);
        if (!historic) {
            throw new NotFoundException(`Registro histórico com ID ${id} não encontrado`);
        }

        // Exclui o registro de histórico
        await this.prisma.historic.delete({
            where: { id },
        });
    }
}
