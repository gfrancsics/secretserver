import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SecretRepositoryService } from './secret-repository.service';
import {
  CreateSecretDto,
  ReadSecretDto,
  ReadSecretMetaDto,
} from '../dto/api-interfaces';

// ! The route definitions don't exactly fit the requirements, but it is fine.
// ! But the input validation is really missing. The users doesn't have any response if they send bad\incorrect data.
// ! Or since this is kind of a safety critical API, you have to be aware of malicious users.
@Controller('secret-repository')
export class SecretRepositoryController {
  constructor(private readonly secretService: SecretRepositoryService) {}

  @Post('secrets')
  async createSecretRequest(
    @Body() secretDto: CreateSecretDto,
  ): Promise<ReadSecretMetaDto> {
    return this.secretService.createSecret(secretDto);
  }

  @Get('secrets')
  async getAllSecretsRequest(): Promise<ReadSecretMetaDto[]> {
    return this.secretService.getAllSecret();
  }

  @Get('secrets/:id')
  async findSecretRequest(@Param() params): Promise<ReadSecretDto> {
    return this.secretService.findSecret(params.id);
  }
}
