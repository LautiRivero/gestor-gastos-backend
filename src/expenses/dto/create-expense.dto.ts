import {IsNumber, IsString, IsUUID, IsOptional, Min} from 'class-validator';

export class CreateExpenseDto {

    @IsNumber()
    @Min(0.01, {message: 'El monto debe ser mayor a 0'})
    amount: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUUID('4', {message: 'El id debe ser un UUID válido'})
    userId: string;

    @IsUUID('4', {message: 'El category_id debe ser un UUID válido'})
    categoryId: string;

}
