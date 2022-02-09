import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { getConnection, getRepository } from 'typeorm';
import { SessionEntity } from './typeorm/Session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionReponsitory = getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'undefinedCompany',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 6000,
      },
      store: new TypeormStore().connect(sessionReponsitory),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}
bootstrap();
