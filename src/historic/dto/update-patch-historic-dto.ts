import { PartialType } from "@nestjs/mapped-types";
import { CreateHistoricDto } from "./create-historic-dto";

export class UpdatePatchHistoricDto extends PartialType(CreateHistoricDto){}