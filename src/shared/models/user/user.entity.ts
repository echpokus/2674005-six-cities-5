import { prop, getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { UserType } from '../../types/user-type.enum.js';

export interface UserEntity extends defaultClasses.Base {}

export class UserEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({ required: true, trim: true })
  public lastName!: string;

  @prop({ required: true, unique: true, trim: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public avatarUrl!: string;

  @prop({ required: true, enum: UserType, default: UserType.Standard })
  public type!: UserType;
}

export const UserModel = getModelForClass(UserEntity, { 
  schemaOptions: { 
    collection: 'users',
    timestamps: true
  } 
});
