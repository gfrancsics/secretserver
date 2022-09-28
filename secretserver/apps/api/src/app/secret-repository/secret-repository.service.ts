import { Injectable } from '@nestjs/common';
import { CreateSecretDto, ReadSecretDto, ReadSecretMetaDto } from '@secretserver/api-interfaces';

@Injectable()
export class SecretRepositoryService {

    public async createSecret (secretDto : CreateSecretDto) : Promise<ReadSecretMetaDto> {
        return new ReadSecretMetaDto("hash", "fake-secret", 1, "2022.01.01", "2022.02.02");
    }

    public async findSecret (hashedSecretText : string) : Promise<ReadSecretDto> {
        return new ReadSecretDto("hash", "fake-secret", "fake", 1, "2022.01.01", "2022.02.02");
    }

    public async getAllSecret () : Promise<ReadSecretMetaDto[]> {
        return [new ReadSecretMetaDto("hash", "fake-secret", 1, "2022.01.01", "2022.02.02")];
    }
}
