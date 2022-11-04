import { Test, TestingModule } from '@nestjs/testing';
import { SecretRepositoryController } from './secret-repository.controller';
import { SecretRepositoryService } from './secret-repository.service';

describe('SecretRepositoryController', () => {
  let controller: SecretRepositoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SecretRepositoryController],
      providers: [SecretRepositoryService],
    }).compile();

    controller = module.get<SecretRepositoryController>(
      SecretRepositoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
