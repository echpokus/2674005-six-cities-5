import { injectable } from 'inversify';
import { UserEntity, UserModel } from './user.entity.js';
import { IUserService } from './user.service.interface.js';
import { UserType } from '../../types/user-type.enum.js';
import { DocumentType } from '@typegoose/typegoose';

@injectable()
export class UserService implements IUserService {
  async findOrCreate(email: string, name: string, lastName: string, password: string, avatarUrl: string, type: string): Promise<DocumentType<UserEntity>> {
    const existUser = await UserModel.findOne({ email }).exec();
    if (existUser) {
      return existUser;
    }
    
    return UserModel.create({
      email,
      name,
      lastName,
      password,
      avatarUrl,
      type: type as UserType,
    });
  }

  async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return UserModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return UserModel.findOne({ email }).exec();
  }
}
