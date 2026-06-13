import { ProdutoModule } from './produto/produto.module.js';
import { DbModule } from './db/db.module.js';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule, ProdutoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
