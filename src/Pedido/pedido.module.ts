import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoService } from './services/pedido.service';
import { PedidoController } from './controllers/pedido.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])],
  providers: [PedidoService],
  controllers: [PedidoController],
  exports: [PedidoService],
})
export class PedidoModule {}
