import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Secret, SecretSchema } from '../secret-modell/secret-schema';
import { SecretHandlerService } from './secret-handler.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Secret.name, schema: SecretSchema }]),
  ],
  providers: [SecretHandlerService],
  exports: [SecretHandlerService],
})
export class SecretHandlerModule {}
