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
  UseGuards,
} from '@nestjs/common';
import { Estabelecimento } from '../entities/estabelecimento.entity';
import { EstabelecimentoService } from '../services/estabelecimento.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreateEstabelecimentoDto } from '../dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from '../dto/update-estabelecimento.dto';

@ApiTags('Estabelecimento')
@Controller('/estabelecimentos')
@ApiBearerAuth()
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Estabelecimento> {
    return this.estabelecimentoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findByName(@Param('nome') nome: string): Promise<Estabelecimento[]> {
    return this.estabelecimentoService.findByName(nome);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() estabelecimentoDto: CreateEstabelecimentoDto,
  ): Promise<Estabelecimento> {
    return this.estabelecimentoService.create(
      estabelecimentoDto as Estabelecimento,
    );
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  update(
    @Body() estabelecimentoDto: UpdateEstabelecimentoDto,
  ): Promise<Estabelecimento> {
    return this.estabelecimentoService.update(
      estabelecimentoDto as Estabelecimento,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.estabelecimentoService.delete(id);
  }
}
