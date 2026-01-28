import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedidos } from '../entities/pedido.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedidos)
    private pedidoRepository: Repository<Pedidos>,
  ) {}

  //   Metodo usado para retornar todos os Pedidos
  async findAll(): Promise<Pedidos[]> {
    return await this.pedidoRepository.find({
      relations: {
        usuario: true,
        estabelecimento: true,
      },
    });
  }

  //   Metodo usado para retornar os Pedidos por Id
  async findById(id: number): Promise<Pedidos> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: id },
      relations: {
        usuario: true,
        estabelecimento: true,
      },
    });
    if (!pedido)
      throw new HttpException('Pedido não encontrado', HttpStatus.NOT_FOUND);
    return pedido;
  }

  //   Metodo para retornar pedidos Status
  async findByStatus(status: string): Promise<Pedidos[]> {
    return await this.pedidoRepository.find({
      where: { status: ILike(`%${status}%`) },
    });
  }

  //   Metodo usado para criar o Pedidos
  async create(pedido: Pedidos): Promise<Pedidos> {
    return await this.pedidoRepository.save(pedido);
  }

  //   Metodo usado para atualizar os Pedidos
  async update(pedido: Pedidos): Promise<Pedidos> {
    await this.findById(pedido.id);
    return this.pedidoRepository.save(pedido);
  }

  //   Metodo usado para deletar Pedidos
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.pedidoRepository.delete(id);
  }
}
