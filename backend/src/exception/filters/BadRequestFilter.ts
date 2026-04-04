import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BadRequestException } from '../BadRequestException';

@Catch(BadRequestException)
export class ConflictFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(400).json({
      message: exception.message,
      error: 'BadRequestException',
      statusCode: 400,
    });
  }
}
