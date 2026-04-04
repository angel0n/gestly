import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto{
  @IsString()
  @IsNotEmpty()
  current: string;

  @IsString()
  @IsNotEmpty()
  next: string;
}