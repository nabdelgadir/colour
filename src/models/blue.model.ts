import {Entity, model, property, hasMany} from '@loopback/repository';
import {Purple} from '../models';

@model()
export class Blue extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  hue: string;

  @hasMany(() => Purple)
  purples?: Purple[];

  constructor(data?: Partial<Blue>) {
    super(data);
  }
}
