import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import { Pedidos } from '../entities/pedido.entity';

@Controller('/Pedidos')
export class PedidoController {
  constructor(private PedidoService: PedidoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Pedidos[]> {
    return this.PedidoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Pedidos> {
    return this.PedidoService.findById(id);
  }

  @Get('/pedidos/:status')
  @HttpCode(HttpStatus.OK)
  findByStatus(@Param('status') status: string): Promise<Pedidos[]> {
    return this.PedidoService.findByStatus(status);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() pedido: Pedidos): Promise<Pedidos> {
    return this.PedidoService.create(pedido);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() pedido: Pedidos): Promise<Pedidos> {
    return this.PedidoService.update(pedido);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.PedidoService.delete(id);
  }
}
