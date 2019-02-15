import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
  // belongsTo,
} from '@loopback/repository';

@model()
export class Pink extends Entity {
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

  @hasMany(() => Pink, {keyTo: 'parentId'})
  pinks: Pink[];

  @belongsTo(() => Pink)
  pink?: number;

  @property({type: 'number'})
  parentId?: number;

  constructor(data?: Partial<Pink>) {
    super(data);
  }
}
