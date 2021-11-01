import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pilz,
  PilzLocation,
} from '../models';
import {PilzRepository} from '../repositories';

export class PilzPilzLocationController {
  constructor(
    @repository(PilzRepository) protected pilzRepository: PilzRepository,
  ) { }

  @get('/pilzs/{id}/pilz-locations', {
    responses: {
      '200': {
        description: 'Array of Pilz has many PilzLocation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PilzLocation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PilzLocation>,
  ): Promise<PilzLocation[]> {
    return this.pilzRepository.pilzLocations(id).find(filter);
  }

  @post('/pilzs/{id}/pilz-locations', {
    responses: {
      '200': {
        description: 'Pilz model instance',
        content: {'application/json': {schema: getModelSchemaRef(PilzLocation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pilz.prototype.pilzID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PilzLocation, {
            title: 'NewPilzLocationInPilz',
            exclude: ['locationID'],
            optional: ['pilzId']
          }),
        },
      },
    }) pilzLocation: Omit<PilzLocation, 'locationID'>,
  ): Promise<PilzLocation> {
    return this.pilzRepository.pilzLocations(id).create(pilzLocation);
  }

  @patch('/pilzs/{id}/pilz-locations', {
    responses: {
      '200': {
        description: 'Pilz.PilzLocation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PilzLocation, {partial: true}),
        },
      },
    })
    pilzLocation: Partial<PilzLocation>,
    @param.query.object('where', getWhereSchemaFor(PilzLocation)) where?: Where<PilzLocation>,
  ): Promise<Count> {
    return this.pilzRepository.pilzLocations(id).patch(pilzLocation, where);
  }

  @del('/pilzs/{id}/pilz-locations', {
    responses: {
      '200': {
        description: 'Pilz.PilzLocation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PilzLocation)) where?: Where<PilzLocation>,
  ): Promise<Count> {
    return this.pilzRepository.pilzLocations(id).delete(where);
  }
}
