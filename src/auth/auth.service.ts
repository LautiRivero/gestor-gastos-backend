import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const {email, password} = loginDto;


        //buscamos el email del usuario en la base de datos
        const user = await this.usersService.findByEmail(email);
        
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }


        //comparamos la contraseña ingresada con la contraseña hasheada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        
        //generar el payload para el token JWT, que contiene la información del usuario
        const payload = { sub: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }






}
