import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ConflictException } from '../ConflictException';

@Catch(ConflictException)
export class ConflictFilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(400).json({
      message: exception.message,
      error: 'ConflictException',
      statusCode: 400,
    });
  }
}
