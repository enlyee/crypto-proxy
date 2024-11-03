import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Moralis from 'moralis';
import configuration from './config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await Moralis.start({
    apiKey: configuration().api.moralis,
  });
  const config = new DocumentBuilder()
    .setTitle('CryptoProxy Control Panel')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('panel', app, documentFactory);
  await app.listen(configuration().port);
}
bootstrap();
