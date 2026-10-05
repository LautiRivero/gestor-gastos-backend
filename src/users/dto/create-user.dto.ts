import {IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  
    @IsEmail({}, {message: 'El correo electrónico debe ser válido'})
    @IsNotEmpty({message: 'El correo electrónico es obligatorio'})
    email: string;

    @IsString({})
    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    @MinLength(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
    password: string;

    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    name: string;

}
