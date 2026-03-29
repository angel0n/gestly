import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundException } from '../NotFoundException';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(404).json({
      message: exception.message,
      error: 'NotFoundException',
      statusCode: 404,
    });
  }
}
