import { Test, TestingModule } from '@nestjs/testing';
import { SecretRepositoryController } from './secret-repository.controller';

describe('SecretRepositoryController', () => {
  let controller: SecretRepositoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretRepositoryController],
    }).compile();

    controller = module.get<SecretRepositoryController>(
      SecretRepositoryController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
