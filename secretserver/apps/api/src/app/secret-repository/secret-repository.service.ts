import { Injectable } from '@nestjs/common';
import { CreateSecretDto, ReadSecretDto, ReadSecretMetaDto } from '@secretserver/api-interfaces';

@Injectable()
export class SecretRepositoryService {

    public async createSecret (secretDto : CreateSecretDto) : Promise<ReadSecretMetaDto> {
        if(this.validateSecretDto(secretDto)) {
            return new ReadSecretMetaDto("hash", "fake-secret", 1, "2022.01.01", "2022.02.02");
        }
        else {
            return null;
        }
    }

    public async findSecret (hashedSecretText : string) : Promise<ReadSecretDto> {
        return new ReadSecretDto("hash", "fake-secret", "fake", 1, "2022.01.01", "2022.02.02");
    }

    public async getAllSecret () : Promise<ReadSecretMetaDto[]> {
        return [new ReadSecretMetaDto("hash", "fake-secret", 1, "2022.01.01", "2022.02.02")];
    }

    private validateSecretDto(secretDto : CreateSecretDto): boolean {
        if(!secretDto.secretName) {
            console.log("Empty or null secret name");
            return false;
        }
        if(!secretDto.secretText) {
            console.log("Empty or null secret text");
            return false;
        }
        if(!secretDto.remainingViews) {
            console.log("Remaining views is not defined!");
            return false;
        }
        else if(secretDto.remainingViews < 1) {
            console.log("Remaining views must be greater then 0!")
        }
        return true;
    }

    private validateHashedText(hash : string) : boolean {
        if(!hash) {
            console.log("Hash value can not be empty or null string!");
            return false;
        }
        return true;
    }
}
