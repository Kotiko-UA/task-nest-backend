import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from 'src/task/task.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from '../../db/entities';
import { AppDataSource } from 'db/dataSource';
@Module({
  imports: [
    AuthModule,
    TaskModule,
    UserModule,
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
        entities: Object.values(Entities),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
