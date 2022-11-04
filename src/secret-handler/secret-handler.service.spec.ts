import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSecretDto } from '../dto/api-interfaces';
import { mockModel } from '../../test/mock/mongoose.mock';
import { SecretHandlerService } from '../secret-handler/secret-handler.service';
import { Secret, SecretDocument } from '../secret-modell/secret-schema';
import { Model } from 'mongoose';

describe('SecretService', () => {
  let service: SecretHandlerService;
  let model: Model<Secret>;

  const secretDto = new CreateSecretDto('', '', 1);
  const secretArray = [
    {
      hashedSecretText: 'hash',
      secretName: 'name1',
      secretText: 'text1',
      remainingViews: 1,
      createdAt: '2022.11.04',
      updatedAt: '2022.11.04',
    },
  ];
  const secret = {
    hashedSecretText: 'hash',
    secretName: 'name1',
    secretText: 'text1',
    remainingViews: 1,
    createdAt: '2022.11.04',
    updatedAt: '2022.11.04',
  };

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
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            create: jest.fn().mockResolvedValue(secretDto),
          },
        },
      ],
    }).compile();
    service = module.get<SecretHandlerService>(SecretHandlerService);
    model = module.get<Model<Secret>>(getModelToken(Secret.name));
  });

  describe('createSecret function', () => {
    it('should insert a new secret', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(secretDto),
      } as any);
      const responseSecret = await service.createSecret(secretDto);
      expect(secretDto.secretName).toEqual(responseSecret.secretName);
    });
  });

  describe('getAllSecrets function', () => {
    it('should return all the secrets', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(secretArray),
      } as any);
      const responseSecret = await service.getAllSecrets();
      expect(secretArray[0].secretName).toEqual(responseSecret[0].secretName);
    });
  });

  describe('getSecret function', () => {
    it('should find a secret by hashedtext', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(secret),
      } as any);
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(secret),
      } as any);
      const responseSecret = await service.getSecret('hash');
      expect(responseSecret.secretName).toEqual(secret.secretName);
    });
  });
});
