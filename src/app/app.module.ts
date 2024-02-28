import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from 'src/task/task.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from 'src/auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TaskModule,
    UserModule,
    AuthController,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
