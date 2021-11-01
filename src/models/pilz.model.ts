import {Entity, model, property} from '@loopback/repository';

@model()
export class Pilz extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
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


  constructor(data?: Partial<Pilz>) {
    super(data);
  }
}

export interface PilzRelations {
  // describe navigational properties here
}

export type PilzWithRelations = Pilz & PilzRelations;
