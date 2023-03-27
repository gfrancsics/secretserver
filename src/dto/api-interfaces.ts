export interface Message {
  message: string;
}
// ! I like that you used one file to collect every DTO related to the secret.
// ! A way to make it a bit better is to notice that the ReadSecretDto is the extended version of ReadSecretMetaDto.
// ! Define the smaller one, and extend from it. This way you will have less duplicates and the maintainability is much better.
// ! Then finally using the typescript utility types (Partial<T> or Pick<T> or Omit<T>) you can define the Create dto.
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
