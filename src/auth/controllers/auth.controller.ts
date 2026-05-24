import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logar')
  login(@Body() usuario: UsuarioLogin): Promise<any> {
    return this.authService.login(usuario);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    /* Inicia o fluxo OAuth com o provedor Google */
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request & { user: any },
    @Res() res: any,
  ) {
    // Envia os dados desestruturados do req.user para o método correto da sua Service
    const dadosAutenticados = await this.authService.validateOAuthLogin({
      email: req.user.email,
      nome: req.user.nome,
      foto: req.user.foto,
    });

    const token = dadosAutenticados.token;
    const usuario = encodeURIComponent(dadosAutenticados.usuario);
    const nome = encodeURIComponent(dadosAutenticados.nome);
    const foto = encodeURIComponent(dadosAutenticados.foto || '');

    // Redireciona de volta para o endereço do seu ecossistema React (Vite)
    return res.redirect(
      `https://nutrigodelivery.vercel.app//google-success?token=${token}&usuario=${usuario}&nome=${nome}&foto=${foto}`,
    );
  }
}
