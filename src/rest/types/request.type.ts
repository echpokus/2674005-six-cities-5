import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../../shared/models/user/user.entity.js';

export type TokenPayload = {
  email: string;
  id: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: DocumentType<UserEntity>;
      tokenPayload?: TokenPayload;
    }
  }
}
