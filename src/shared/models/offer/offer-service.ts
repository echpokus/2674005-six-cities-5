import { injectable } from 'inversify';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { IOfferService } from './offer.service.interface.js';
import { DocumentType } from '@typegoose/typegoose';

@injectable()
export class OfferService implements IOfferService {
  async create(offer: OfferEntity): Promise<DocumentType<OfferEntity>> {
    return OfferModel.create(offer);
  }

  async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return OfferModel.findById(id).populate('author').exec();
  }
}
