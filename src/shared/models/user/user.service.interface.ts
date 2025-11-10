import { UserEntity } from './user.entity.js';
import { DocumentType } from '@typegoose/typegoose';

export interface IUserService {
  findOrCreate(email: string, name: string, lastName: string, password: string, avatarUrl: string, type: string): Promise<DocumentType<UserEntity>>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
}
