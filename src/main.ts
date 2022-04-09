import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { getRepository } from 'typeorm';
import { SessionEntity } from './typeorm/Session';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule /* ,{ cors: true }*/);
  const sessionReponsitory = getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'undefinedCompany',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 6000000000000,
      },
      store: new TypeormStore({}).connect(sessionReponsitory),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  const port = process.env.PORT || 5001;
  console.log(`Server running on port : ${port}`);
  await app.listen(port);
}
bootstrap();
