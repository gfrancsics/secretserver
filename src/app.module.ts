import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretHandlerModule } from './secret-handler/secret-handler.module';
import { SecretRepositoryModule } from './secret-repository/secret-repository.module';

@Module({
  imports: [
    SecretHandlerModule,
    SecretRepositoryModule,
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'secretdb' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
