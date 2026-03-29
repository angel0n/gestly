import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './exception/filters/NotFoundFilter';
import { ValidationPipe } from '@nestjs/common';
import { ConflictFilter } from './exception/filters/ConflictFilter';
import { InternalServerErrorFilter } from './exception/filters/InternalServerErrorFilter';
import { UnauthorizedFilter } from './exception/filters/UnauthorizedFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new NotFoundFilter(),
    new ConflictFilter(),
    new InternalServerErrorFilter(),
    new UnauthorizedFilter(),
  );

  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }))
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
