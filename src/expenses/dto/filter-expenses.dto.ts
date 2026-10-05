import {IsOptional, IsString, IsDateString, IsUUID} from 'class-validator';

export class FilterExpensesDto {
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    description?: string;
    

}
