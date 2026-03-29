import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorException } from '../InternalServerErrorException';

@Catch(InternalServerErrorException)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(500).json({
      message: exception.message,
      error: 'InternalServerErrorException',
      statusCode: 500,
    });
  }
}
