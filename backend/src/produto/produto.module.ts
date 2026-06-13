import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller.js';
import { ProdutoService } from './produto.service.js';
import { DbModule } from '../db/db.module.js';


@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
  imports: [DbModule],
})
export class ProdutoModule {}
