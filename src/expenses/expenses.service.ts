import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilterExpensesDto } from './dto/filter-expenses.dto';

@Injectable()
export class ExpensesService {
  
  constructor(private readonly prisma: PrismaService) {}

  //usamos async/await para manejar las promesas de Prisma
  //permite que estas consultas se realicen en 2do plano y no bloqueen el hilo principal 
  //de ejecución
  //creamos gastos
  /*
  async create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: createExpenseDto,
      include: {// hace un JOIN con la tabla de categoria para devolver la info de la categoria
        category: true,//devuelve tambien la inf de la categoria
      },
    });
  }
  */

  async create(createExpenseDto: CreateExpenseDto, userId: string) {
    return this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        userId, // Asignamos el userId al crear el gasto
      },
      include: {
        category: true,
      },
    });
  } 

  async findAll(userId : string, filters?: FilterExpensesDto) {
    const {categoryId, startDate, endDate, description} = filters || {};

    //condicion base para filtrar los gastos por usuario
    const whereConditions: any = { userId };//filtramos por usuario para que este solo vea sus gastos 
                                            //y no los de otros usuarios

    //si viene la categoriID, filtramos por categoria
    if (categoryId) {
      whereConditions.categoryId = categoryId;
    }

    //si viene la fecha de inicio, filtramos por fecha de inicio
    if (startDate || endDate) {
      whereConditions.date = {};
      if (startDate) {
        whereConditions.date.gte = new Date(startDate);
      }
      if (endDate) {
        whereConditions.date.lte = new Date(endDate);
      }

    }

    if(description) {
      whereConditions.description = {
        contains: description,
        mode: 'insensitive', //para que no sea case sensitive
      };
    }

    const expenses = await this.prisma.expense.findMany({
      where: whereConditions,
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return {
      totalAmount,
      count: expenses.length,
      expenses,
    };
  }


  async findOne(id: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!expense) {
      throw new NotFoundException(`Gasto con id ${id} no encontrado`);
    }

    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    await this.findOne(id); // Verifica si el gasto existe antes de actualizarlo
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.expense.delete({
      where: { id },
    });
  }


  
  
  /*create(createExpenseDto: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
  */
}
