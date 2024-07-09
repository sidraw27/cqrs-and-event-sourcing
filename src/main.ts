import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import { connectToEventStore } from './infrastructure/event-store';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connectToEventStore();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
