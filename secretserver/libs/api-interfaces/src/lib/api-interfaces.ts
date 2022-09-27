export interface Message {
  message: string;
}

export interface ReadSecretMetaDto {
    hashedSecretText:	string
    secretName:	string
    remainingViews:	number
    createdAt:	string
    updatedAt:	string
}

export interface ReadSecretDto {
  hashedSecretText:	string
  secretName:	string
  secretText:	string
  remainingViews:	number
  createdAt:	string
  updatedAt:	string
}

export interface CreateSecretDto {
  secretName:	string
  secretText:	string
  remainingViews:	number
}
