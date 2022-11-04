import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SecretDocument = Secret & Document;

@Schema()
export class Secret {
  @Prop()
  hashedSecretText: string;
  @Prop()
  secretName: string;
  @Prop()
  secretText: string;
  @Prop()
  remainingViews: number;
  @Prop()
  createdAt: string;
  @Prop()
  updatedAt: string;
}

export const SecretSchema = SchemaFactory.createForClass(Secret);
