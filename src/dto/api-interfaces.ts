export interface Message {
  message: string;
}

export class ReadSecretMetaDto {
  hashedSecretText: string;
  secretName: string;
  remainingViews: number;
  createdAt: string;
  updatedAt: string;

  constructor(
    hashedSecretText: string,
    secretName: string,
    remainingViews: number,
    createdAt: string,
    updatedAt: string,
  ) {
    this.hashedSecretText = hashedSecretText;
    this.secretName = secretName;
    this.remainingViews = remainingViews;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class ReadSecretDto {
  hashedSecretText: string;
  secretName: string;
  secretText: string;
  remainingViews: number;
  createdAt: string;
  updatedAt: string;

  constructor(
    hashedSecretText: string,
    secretName: string,
    secretText: string,
    remainingViews: number,
    createdAt: string,
    updatedAt: string,
  ) {
    this.hashedSecretText = hashedSecretText;
    this.secretName = secretName;
    this.secretText = secretText;
    this.remainingViews = remainingViews;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class CreateSecretDto {
  secretName: string;
  secretText: string;
  remainingViews: number;

  constructor(secretName: string, secretText: string, remainingViews: number) {
    this.secretName = secretName;
    this.secretText = secretText;
    this.remainingViews = remainingViews;
  }
}
