import { Module } from '@nestjs/common';
import { SecretHandlerModule } from '../secret-handler/secret-handler.module';
import { SecretRepositoryController } from './secret-repository.controller';
import { SecretRepositoryService } from './secret-repository.service';

@Module({
  imports: [SecretHandlerModule],
  controllers: [SecretRepositoryController],
  providers: [SecretRepositoryService],
})
export class SecretRepositoryModule {}
