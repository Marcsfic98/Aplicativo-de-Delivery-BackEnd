/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByUsuario(username);

    if (!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenhas(
      password,
      buscaUsuario.senha,
    );

    if (buscaUsuario && matchPassword) {
      const { senha, ...resposta } = buscaUsuario;
      return resposta;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const buscaUsuario = await this.usuarioService.findByUsuario(
      usuarioLogin.usuario,
    );

    if (!buscaUsuario) {
      throw new HttpException(
        'Usuário não encontrado!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      sub: usuarioLogin.usuario,
      id: buscaUsuario.id,
      role: buscaUsuario.tipo,
    };

    return {
      id: buscaUsuario.id,
      nome: buscaUsuario.nome,
      usuario: usuarioLogin.usuario,
      senha: '',
      foto: buscaUsuario.foto,
      tipo: buscaUsuario.tipo,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

  async validateOAuthLogin({
    email,
    nome,
    foto,
  }: {
    email: string;
    nome: string;
    foto?: string;
  }) {
    if (!email)
      throw new HttpException('E-mail não fornecido pelo provedor OAuth', HttpStatus.BAD_REQUEST);

    let usuario = await this.usuarioService.findByUsuario(email);

    if (!usuario) {
      const senhaGerada = crypto.randomBytes(16).toString('hex');
      const novoUsuario: any = {
        nome: nome || email,
        usuario: email,
        senha: senhaGerada,
        foto: foto || null,
      };

      usuario = await this.usuarioService.create(novoUsuario);
    }

    const payload = {
      sub: usuario.usuario,
      id: usuario.id,
      role: usuario.tipo,
    };

    return {
      id: usuario.id,
      nome: usuario.nome,
      usuario: usuario.usuario,
      senha: '',
      foto: usuario.foto,
      tipo: usuario.tipo,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
