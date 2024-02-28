import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServise = app.get(ConfigService);
  const port = configServise.get('port');
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
