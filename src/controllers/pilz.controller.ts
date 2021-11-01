import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pilz} from '../models';
import {PilzRepository} from '../repositories';

export class PilzController {
  constructor(
    @repository(PilzRepository)
    public pilzRepository : PilzRepository,
  ) {}

  @post('/pilze')
  @response(200, {
    description: 'Pilz model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pilz)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pilz, {
            title: 'NewPilz',
            exclude: ['pilzID'],
          }),
        },
      },
    })
    pilz: Omit<Pilz, 'pilzID'>,
  ): Promise<Pilz> {
    return this.pilzRepository.create(pilz);
  }

  @get('/pilze/count')
  @response(200, {
    description: 'Pilz model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pilz) where?: Where<Pilz>,
  ): Promise<Count> {
    return this.pilzRepository.count(where);
  }

  @get('/pilze')
  @response(200, {
    description: 'Array of Pilz model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pilz, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pilz) filter?: Filter<Pilz>,
  ): Promise<Pilz[]> {
    return this.pilzRepository.find(filter);
  }

  @patch('/pilze')
  @response(200, {
    description: 'Pilz PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pilz, {partial: true}),
        },
      },
    })
    pilz: Pilz,
    @param.where(Pilz) where?: Where<Pilz>,
  ): Promise<Count> {
    return this.pilzRepository.updateAll(pilz, where);
  }

  @get('/pilze/{id}')
  @response(200, {
    description: 'Pilz model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pilz, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pilz, {exclude: 'where'}) filter?: FilterExcludingWhere<Pilz>
  ): Promise<Pilz> {
    return this.pilzRepository.findById(id, filter);
  }

  @patch('/pilze/{id}')
  @response(204, {
    description: 'Pilz PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pilz, {partial: true}),
        },
      },
    })
    pilz: Pilz,
  ): Promise<void> {
    await this.pilzRepository.updateById(id, pilz);
  }

  @put('/pilze/{id}')
  @response(204, {
    description: 'Pilz PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pilz: Pilz,
  ): Promise<void> {
    await this.pilzRepository.replaceById(id, pilz);
  }

  @del('/pilze/{id}')
  @response(204, {
    description: 'Pilz DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pilzRepository.deleteById(id);
  }
}
