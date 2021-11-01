import {Entity, hasMany, model, property} from '@loopback/repository';
import {PilzLocation} from './pilz-location.model';



@model()
export class Pilz extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  pilzID?: number;
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  feature1?: string;

  @property({
    type: 'string',
  })
  feature2?: string;

  @hasMany(() => PilzLocation)
  pilzLocations: PilzLocation[];

  constructor(data?: Partial<Pilz>) {
    super(data);
  }
}

export interface PilzRelations {
  pilzLocation?:
}

export type PilzWithRelations = Pilz & PilzRelations;
