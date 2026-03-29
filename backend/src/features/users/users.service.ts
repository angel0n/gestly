import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { ConflictException } from '../../exception/ConflictException';
import { InternalServerErrorException } from '../../exception/InternalServerErrorException';
import { NotFoundException } from '../../exception/NotFoundException';
import { PaginationDto } from '../../core/dtos/PaginationDto';
import { PaginatedResult } from '../../core/interfaces/IPaginatedResult';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await this.authService.hashPassword(createUserDto.password);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<User>> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.usersRepository.findAndCount({
      where: { active: UserRole.ACTIVE },
      select: ['id', 'name', 'email', 'active', 'createdAt', 'updatedAt'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'active', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.authService.hashPassword(updateUserDto.password);
    }

    const updated = this.usersRepository.merge(user, updateUserDto);

    try {
      return await this.usersRepository.save(updated);
    } catch (error) {
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async inactive(id: number) {
    const user = await this.findOne(id);

    await this.usersRepository.update(id, { active: UserRole.INACTIVE });

    return { message: `User #${id} deactivated successfully` };
  }
}
