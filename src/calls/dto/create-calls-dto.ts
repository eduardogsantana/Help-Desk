import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority, Status } from '@prisma/client';

export class CreateCallDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsEnum(Status)
    status: Status;

    @IsEnum(Priority)
    priority: Priority;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    technicianId?: string;
}