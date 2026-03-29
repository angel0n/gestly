import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  private readonly saltRounds = parseInt(process.env.SALT_ROUNDS!);

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async createToken(user: User) {
    const payload = { id: user.id, name: user.name, email: user.email };
    return await this.jwtService.signAsync(payload);
  }

  async validate(auth?: string) {
    if (!auth) {
      throw new UnauthorizedException('Token não enviado');
    }

    const [, token] = auth.split(' ');

    if (!token) {
      throw new UnauthorizedException('Token inválido');
    }

    const payload = this.validateToken(token);

    if (!payload) {
      throw new UnauthorizedException('Payload inválido');
    }

    const user = await this.userRepository.findOneBy(payload.id);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const newToken = await this.createToken(user);

    return { id: user.id, name: user.name, email: user.email, token: newToken };
  }

  private validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
