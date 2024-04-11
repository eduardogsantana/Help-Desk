import { PartialType } from "@nestjs/mapped-types";
import { CreateCallDto } from "./create-calls-dto";

export class UpdatePatchCallDto extends PartialType(CreateCallDto){}