import { Module } from '@nestjs/common';
import { SecretRepositoryController } from './secret-repository.controller';
import { SecretRepositoryService } from './secret-repository.service';

@Module({
  controllers: [SecretRepositoryController],
  providers: [SecretRepositoryService],
})
export class SecretRepositoryModule {}
