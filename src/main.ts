import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('Practise project: Quiz app')
    .setDescription('This is a practise project on ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const apiDocsUri = 'api/docs';
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiDocsUri, app, document);

  const cf = app.get(ConfigService);
  const nodeEnv = cf.get('NODE_ENV')
    ? (cf.get('NODE_ENV') as string).toUpperCase()
    : 'DEV';
  const protocol = cf.get(`API_${nodeEnv}_PROTOCOL`);
  const host = cf.get(`API_${nodeEnv}_HOST`);
  const port = +cf.get(`API_${nodeEnv}_PORT`);
  await app.listen(port, () => {
    console.log(
      `API docs is available on URL: ${protocol}://${host}:${port}/${apiDocsUri}`,
    );
  });
}
bootstrap();
