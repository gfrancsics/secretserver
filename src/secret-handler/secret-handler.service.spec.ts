import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSecretDto } from '../dto/api-interfaces';
import { mockModel } from '../../test/mock/mongoose.mock';
import { SecretHandlerService } from '../secret-handler/secret-handler.service';
import { Secret, SecretDocument } from '../secret-modell/secret-schema';

describe('SecretService', () => {
  let service: SecretHandlerService;
  const secretDto = new CreateSecretDto('', '', 1);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretHandlerService,
        {
          provide: getModelToken(Secret.name),
          useValue: {
            new: jest.fn().mockResolvedValue(secretDto),
            constructor: jest.fn().mockResolvedValue(secretDto),
            find: jest.fn(),
            create: jest.fn().mockResolvedValue(secretDto),
            exec: jest.fn(),
            replaceOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SecretHandlerService>(SecretHandlerService);
  });

  it('should insert a new cat', async () => {
    const newSecret = new CreateSecretDto('', '', 1);
    const responseSecret = await service.createSecret(newSecret);
    console.log(responseSecret);
  });
});
