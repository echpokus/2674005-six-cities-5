import { OfferEntity } from './offer.entity.js';
import { DocumentType } from '@typegoose/typegoose';

export interface IOfferService {
  create(offer: OfferEntity): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
