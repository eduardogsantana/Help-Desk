import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { CallsController } from "./calls.controller";
import { CallsService } from "./calls.service";

@Module({
    imports:[PrismaModule],
    controllers:[CallsController],
    exports:[],
    providers:[CallsService]
})
export class CallsModule{}