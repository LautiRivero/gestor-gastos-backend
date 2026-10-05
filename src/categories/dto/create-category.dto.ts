import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({message: 'El nombre de la categoría es obligatorio'})
    @MinLength(3, {message: 'El nombre de la categoría debe tener al menos 3 caracteres'})
    name: string;
}