import { Injectable, NotFoundException } from '@nestjs/common';
import { Call } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCallDto } from './dto/create-calls-dto';
import { UpdateCallDto } from './dto/update-calls-dto';


@Injectable()
export class CallsService {
    constructor(private prisma: PrismaService) {}

    async createCall(createCallDto: CreateCallDto): Promise<Call> {
        return this.prisma.call.create({
            data: createCallDto,
        });
    }

    async findAll(): Promise<Call[]> {
        return this.prisma.call.findMany({
            include: {
                user: true,
                technician: true,
                history: true,
            },
        });
    }

    async findOne(id: string): Promise<Call> {
        const call = await this.prisma.call.findUnique({
            where: { id },
            include: {
                user: true,
                technician: true,
                history: true,
            },
        });

        if (!call) {
            throw new NotFoundException(`Registro de chamada com ID ${id} não encontrado
            `);
        }

        return call;
    }

    async updateCall(id: string, updateCallDto: UpdateCallDto): Promise<Call> {
        await this.findOne(id); // Verifica se o registro existe

        return this.prisma.call.update({
            where: { id },
            data: updateCallDto,
        });
    }

    async deleteCall(id: string): Promise<void> {
        await this.findOne(id); // Verifica se o registro existe

        await this.prisma.call.delete({
            where: { id },
        });
    }

    // Implementação do método assignTechnician
    async assignTechnician(id: string, technicianId: string): Promise<Call> {
        // Verifica se o chamado existe
        const call = await this.findOne(id);
        if (!call) {
            throw new NotFoundException(`Registro de chamada com ID ${id} não encontrado
            `);
        }

        // Atualiza o técnico atribuído ao chamado
        return this.prisma.call.update({
            where: { id },
            data: {
                technicianId, // Atualiza o ID do técnico
            },
        });
    }
}
