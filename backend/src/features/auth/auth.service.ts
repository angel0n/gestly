import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/LoginDto';


@Injectable()
export class AuthService {
  private readonly saltRounds = parseInt(process.env.SALT_ROUNDS!);

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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

    const user = await this.usersRepository.findOneBy(payload.id);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const newToken = await this.createToken(user);

    return { id: user.id, name: user.name, email: user.email, token: newToken };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email, active: UserRole.ACTIVE },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async getMe(authHeader: string) {
    try {
      const token = authHeader?.replace('Bearer ', '');

      if (!token) {
        throw new UnauthorizedException('Token not provided');
      }

      const payload = await this.jwtService.verifyAsync(token);

      const user = await this.usersRepository.findOne({
        where: { id: payload.sub, active: UserRole.ACTIVE },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const {password, ...userWhitOutPass} = user;
      return userWhitOutPass;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
