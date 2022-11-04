import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SecretRepositoryService } from './secret-repository.service';
import {
  CreateSecretDto,
  ReadSecretDto,
  ReadSecretMetaDto,
} from '../dto/api-interfaces';

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
