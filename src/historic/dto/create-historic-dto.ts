import { IsNotEmpty, IsString, IsUUID, IsDate, IsOptional } from 'class-validator';

export class CreateHistoricDto {
    @IsUUID()
    @IsNotEmpty()
    callId: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    action: string; // A descrição ou tipo da ação realizada

    @IsDate()
    @IsOptional()
    timestamp?: Date; // Data e hora da ação realizada (opcional)
}
