import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { FilterExpensesDto } from './dto/filter-expenses.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user.decorator';



//los arrobas son decorators, que son funciones que se ejecutan en tiempo de compilación y 
//permiten modificar el comportamiento de las clases, métodos, propiedades o parámetros. En
//este caso, los decoradores @Controller, @Get, @Post, @Patch y @Delete son proporcionados 
//por NestJS y se utilizan para definir rutas y manejar solicitudes HTTP en la aplicación.
@Controller('expenses')
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(
    @Body() createExpenseDto: CreateExpenseDto,
    @GetUser('id') userId: string,//extraemos el id del usuario del token JWT usando el decorador GetUser
  ) {
    // createExpenseDto.userId = userId; // Asignamos el userId al DTO antes de pasarlo al servicio
    return this.expensesService.create(createExpenseDto, userId);
  }

  @Get()
  findAll(
    @GetUser('id') userId: string,
    @Query() filters: FilterExpensesDto,
  ) {
    return this.expensesService.findAll(userId, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
