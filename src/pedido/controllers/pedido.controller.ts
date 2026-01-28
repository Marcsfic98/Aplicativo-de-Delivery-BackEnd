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
import { Pedido } from '../entities/pedido.entity';

@Controller('/pedidos')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.pedidoService.findById(id);
  }

  @Get('/recomendacoes/saudaveis')
  @HttpCode(HttpStatus.OK)
  async getRecomendacoes(): Promise<Pedido[]> {
    return this.pedidoService.recomendarPedidosSaudaveis();
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() pedido: Pedido): Promise<Pedido> {
    return this.pedidoService.create(pedido);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() pedido: Pedido): Promise<Pedido> {
    return this.pedidoService.update(pedido);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.delete(id);
  }
}
