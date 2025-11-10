import { prop, getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { City } from '../../types/city.enum.js';
import { HousingType } from '../../types/housing-type.enum.js';
import { Amenity } from '../../types/amenity.enum.js';
import { UserEntity } from '../user/user.entity.js';

export class LocationEntity {
  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;
}

export interface OfferEntity extends defaultClasses.Base {}

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ required: true, trim: true })
  public description!: string;

  @prop({ required: true })
  public publishDate!: Date;

  @prop({ required: true, enum: City })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ type: () => [String], required: true })
  public images!: string[];

  @prop({ required: true, default: false })
  public isPremium!: boolean;

  @prop({ required: true, default: false })
  public isFavorite!: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, enum: HousingType })
  public type!: HousingType;

  @prop({ required: true, min: 1, max: 8 })
  public rooms!: number;

  @prop({ required: true, min: 1, max: 10 })
  public guests!: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({ type: () => [String], enum: Amenity, required: true })
  public amenities!: Amenity[];

  @prop({ ref: () => UserEntity, required: true })
  public author!: Ref<UserEntity>;

  @prop({ required: true, default: 0 })
  public commentsCount!: number;

  @prop({ _id: false, required: true })
  public location!: LocationEntity;
}

export const OfferModel = getModelForClass(OfferEntity, { 
  schemaOptions: { 
    collection: 'offers',
    timestamps: true
  } 
});
