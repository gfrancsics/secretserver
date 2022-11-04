import { Test, TestingModule } from '@nestjs/testing';
import { SecretRepositoryService } from './secret-repository.service';

describe('SecretRepositoryService', () => {
  let service: SecretRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretRepositoryService],
    }).compile();

    service = module.get<SecretRepositoryService>(SecretRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
