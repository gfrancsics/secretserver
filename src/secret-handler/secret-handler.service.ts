import { Injectable } from '@nestjs/common';
import { Md5 } from 'ts-md5';
import { CreateSecretDto } from '../dto/api-interfaces';
import { Secret, SecretDocument } from '../secret-modell/secret-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SecretHandlerService {
  constructor(
    @InjectModel(Secret.name) private secretModel: Model<SecretDocument>,
  ) {}

  private createHash(text: string): string {
    return Md5.hashStr(text);
  }

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
