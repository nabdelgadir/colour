import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
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

  @hasMany(() => Pink, {keyTo: 'pink'})
  pinks?: Pink[];

  @belongsTo(() => Pink)
  pink?: number;

  constructor(data?: Partial<Pink>) {
    super(data);
  }
}
