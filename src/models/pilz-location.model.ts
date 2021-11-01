import {Entity, model, property} from '@loopback/repository';

@model()
export class PilzLocation extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  locationID?: number;

  @property({
    type: 'number',
    required: true,
  })
  longitude: number;

  @property({
    type: 'number',
    required: true,
  })
  latitude: number;

  @property({
    type: 'number',
  })
  pilzId?: number;

  constructor(data?: Partial<PilzLocation>) {
    super(data);
  }
}

export interface PilzLocationRelations {
  // describe navigational properties here
}

export type PilzLocationWithRelations = PilzLocation & PilzLocationRelations;
