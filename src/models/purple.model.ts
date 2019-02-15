import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Blue} from './blue.model';

@model()
export class Purple extends Entity {
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

  @belongsTo(() => Blue)
  blueId: number;

  constructor(data?: Partial<Purple>) {
    super(data);
  }
}
