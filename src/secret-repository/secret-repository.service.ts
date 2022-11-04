import { Injectable } from '@nestjs/common';
import {
  CreateSecretDto,
  ReadSecretDto,
  ReadSecretMetaDto,
} from '../dto/api-interfaces';
import { SecretHandlerService } from '../secret-handler/secret-handler.service';

@Injectable()
export class SecretRepositoryService {
  constructor(private secretHandler: SecretHandlerService) {}

  public async createSecret(
    secretDto: CreateSecretDto,
  ): Promise<ReadSecretMetaDto> {
    const secret = await this.secretHandler.createSecret(secretDto);
    return new ReadSecretMetaDto(
      secret.hashedSecretText,
      secret.secretName,
      secret.remainingViews,
      secret.createdAt,
      secret.updatedAt,
    );
  }

  public async findSecret(hashedSecretText: string): Promise<ReadSecretDto> {
    const secret = await this.secretHandler.getSecret(hashedSecretText);
    const readSecretDto = new ReadSecretDto(
      secret.hashedSecretText,
      secret.secretName,
      secret.secretText,
      secret.remainingViews,
      secret.createdAt,
      secret.updatedAt,
    );
    return readSecretDto;
  }

  public async getAllSecret(): Promise<ReadSecretMetaDto[]> {
    let readSecretMetaDto = [];
    const secrets = await this.secretHandler.getAllSecrets();
    readSecretMetaDto = [
      ...secrets.map(
        (s) =>
          new ReadSecretMetaDto(
            s.hashedSecretText,
            s.secretName,
            s.remainingViews,
            s.createdAt,
            s.updatedAt,
          ),
      ),
    ];
    return readSecretMetaDto;
  }
}
