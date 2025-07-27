import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      // origin: 'http://localhost:5173',
      origin: true,
      credentials: true,
    },
  });

  app.setGlobalPrefix('api');

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Restoku Api')
    .setDescription('API untuk aplikasi Restoku')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
