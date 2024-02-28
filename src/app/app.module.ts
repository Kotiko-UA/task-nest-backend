import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from 'src/task/task.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from 'src/auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TaskModule,
    AuthController,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configServise: ConfigService) => ({
        type: 'postgres',
        host: configServise.get('DB_HOST'),
        port: configServise.get('DB_PORT'),
        username: configServise.get('DB_USERNAME'),
        password: configServise.get('DB_PASSWORD'),
        database: configServise.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity${.js,.ts}'],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
