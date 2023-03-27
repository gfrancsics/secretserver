import { Injectable } from '@nestjs/common';
import { Md5 } from 'ts-md5';
import { CreateSecretDto } from '../dto/api-interfaces';
import { Secret, SecretDocument } from '../secret-modell/secret-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

// ! Good job on using repository pattern (repository is the closest layer to your database, and the business logic resides in the "service").
// ! It is very useful to separate the business logic from the data access.
// ! It helps you create better tests.
// ! But I think this isn't the best way to go about it (Mixing the repository with the business logic).
// ! Because if this your "secret-repository.service" doesn't really do much because of this, but that should have the business logic.
@Injectable()
export class SecretHandlerService {
  constructor(
    @InjectModel(Secret.name) private secretModel: Model<SecretDocument>,
  ) {}

  private createHash(text: string): string {
    return Md5.hashStr(text);
  }

  // ! I'm not sure what was the reason to create then update the same document.
  // ! In line 27 you create the document, then you overwrite it with the same values and add the hashedSecretText.
  // ! You could add the hashedSecretText from the start and just create it right there.
  // ! If you add validation to your model, this would fail, because "CreateSecretDto" type is not compatible with your schema.
  // ! You are missing the validation what was defined in the requirements.
  // ! You can automate this createdAt and updatedAt by setting the timestamp attribute to true in the schema definition.
  public async createSecret(secretDto: CreateSecretDto): Promise<Secret> {
    //check input CreateSecretDto
    //create new hash
    //update timestamps
    const newSecret = await this.secretModel.create(secretDto);
    newSecret.secretName = secretDto.secretName;
    newSecret.secretText = secretDto.secretText;
    newSecret.remainingViews = secretDto.remainingViews;
    newSecret.hashedSecretText = this.createHash(secretDto.secretText);
    newSecret.createdAt = new Date().toLocaleString();
    newSecret.updatedAt = new Date().toLocaleString();
    await this.secretModel.findByIdAndUpdate(newSecret.id, newSecret).exec();
    return newSecret;
  }

  // ! Updating and checking the remainingViews attribute is business logic. That shouldn't be done in the data access level.
  // ! Throwing specific error is a nice touch here, but IMO this should also be done at the business level.
  // ! Usually exceptions fall under business rules, thus you should handle that at that level.
  // ! Secondly, think if the repository as your database representation. If you think about it that way
  // ! a database usually doesn't throw error if something is null or you create a duplicate.
  public async getSecret(hashedSecretText: string): Promise<Secret> {
    const filter = { hashedSecretText: hashedSecretText };
    const existingSecret = await this.secretModel.findOne(filter).exec();
    if (!existingSecret) {
      throw new NotFoundException(`Secret #${hashedSecretText} not found`);
    }
    //update remainingViews and updatedAt
    if (existingSecret.remainingViews > 0) {
      existingSecret.remainingViews--;
      existingSecret.updatedAt = new Date().toLocaleString();
      this.secretModel
        .findByIdAndUpdate(existingSecret.id, existingSecret)
        .exec();
      return existingSecret;
    } else {
      throw new NotFoundException('Secrets data not available!');
    }
  }

  public async getAllSecrets(): Promise<Secret[]> {
    const secretData = await this.secretModel.find().exec();
    if (!secretData || secretData.length == 0) {
      throw new NotFoundException('Secrets data not found!');
    }
    return secretData;
  }
}
