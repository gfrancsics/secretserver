import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SecretDocument = Secret & Document;
// ! The required option is missing from your props, and that's a mistake.
// ! Without it, the users can save whatever they want into the database. Especially since you haven't implemented validators.
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
