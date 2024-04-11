import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { HistoricService } from "./historic.service";
import { HistoricController } from "./historic.controller";

@Module({
    imports: [PrismaModule],
    controllers: [HistoricController],
    exports: [],
    providers: [HistoricService]
})
export class HistoricModule{}