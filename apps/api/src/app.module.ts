import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaController } from './categoria.controller';

@Module({
  imports: [],
  controllers: [AppController, CategoriaController],
  providers: [AppService],
})
export class AppModule {}
