import {IsOptional, IsString, IsDateString, IsUUID} from 'class-validator';

export class FilterExpensesDto {
    @IsOptional()
    @IsUUID('4', {message: "El categoryId debe ser un UUID válido"})
    categoryId?: string;

    @IsOptional()
    @IsDateString({}, {message: "La fecha de inicio debe ser una fecha válida"})
    startDate?: string;

    @IsOptional()
    @IsDateString({}, {message: "La fecha de finalización debe ser una fecha válida"})
    endDate?: string;

    @IsOptional()
    @IsString()
    description?: string;
    

}
