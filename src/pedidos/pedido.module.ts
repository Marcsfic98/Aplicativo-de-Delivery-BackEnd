import { Module } from '@nestjs/common';
import { Pedidos } from './entities/pedido.entity';
import { PedidoService } from './services/pedido.service';

@Module({
  imports: [Pedidos],
  providers: [PedidoService],
  controllers: [],
  exports: [PedidoService],
})
export class PedidoModule {}
