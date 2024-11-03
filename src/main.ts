import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Moralis from 'moralis';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await Moralis.start({
    apiKey: configuration().api.moralis,
  });
  await app.listen(3000);
}
bootstrap();
