import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('categorias')
export class CategoriaController {
  @Get()
  async findAll() {
    try {
      return await prisma.categoria.findMany();
    } catch (e) {
      return [
        { cod_categoria: '01', nombre: 'Restaurantes', slug_categoria: 'restaurantes' },
        { cod_categoria: '02', nombre: 'Hoteles', slug_categoria: 'hoteles' },
        { cod_categoria: '03', nombre: 'Servicios', slug_categoria: 'servicios' },
      ];
    }
  }
}
