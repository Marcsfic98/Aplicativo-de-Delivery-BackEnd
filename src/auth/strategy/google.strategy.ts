import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://https://aplicativo-de-delivery-backend.onrender.com/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const email =
      profile.emails && profile.emails[0] && profile.emails[0].value;
    const nome =
      profile.displayName ||
      (profile.name &&
        `${profile.name.givenName} ${profile.name.familyName}`) ||
      email;
    const foto = profile.photos && profile.photos[0] && profile.photos[0].value;

    // Retorna o objeto simples. O Passport injeta isso automaticamente dentro de req.user
    return {
      email,
      nome,
      foto,
    };
  }
}
