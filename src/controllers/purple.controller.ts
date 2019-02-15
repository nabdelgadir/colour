import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Purple} from '../models';
import {PurpleRepository} from '../repositories';

export class PurpleController {
  constructor(
    @repository(PurpleRepository)
    public purpleRepository: PurpleRepository,
  ) {}

  @post('/purples', {
    responses: {
      '200': {
        description: 'Purple model instance',
        content: {'application/json': {schema: {'x-ts-type': Purple}}},
      },
    },
  })
  async create(@requestBody() purple: Purple): Promise<Purple> {
    return await this.purpleRepository.create(purple);
  }

  @get('/purples/count', {
    responses: {
      '200': {
        description: 'Purple model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Purple)) where?: Where,
  ): Promise<Count> {
    return await this.purpleRepository.count(where);
  }

  @get('/purples', {
    responses: {
      '200': {
        description: 'Array of Purple model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Purple}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Purple)) filter?: Filter,
  ): Promise<Purple[]> {
    return await this.purpleRepository.find(filter);
  }

  @patch('/purples', {
    responses: {
      '200': {
        description: 'Purple PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() purple: Purple,
    @param.query.object('where', getWhereSchemaFor(Purple)) where?: Where,
  ): Promise<Count> {
    return await this.purpleRepository.updateAll(purple, where);
  }

  @get('/purples/{id}', {
    responses: {
      '200': {
        description: 'Purple model instance',
        content: {'application/json': {schema: {'x-ts-type': Purple}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Purple> {
    return await this.purpleRepository.findById(id);
  }

  @patch('/purples/{id}', {
    responses: {
      '204': {
        description: 'Purple PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() purple: Purple,
  ): Promise<void> {
    await this.purpleRepository.updateById(id, purple);
  }

  @put('/purples/{id}', {
    responses: {
      '204': {
        description: 'Purple PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() purple: Purple,
  ): Promise<void> {
    await this.purpleRepository.replaceById(id, purple);
  }

  @del('/purples/{id}', {
    responses: {
      '204': {
        description: 'Purple DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.purpleRepository.deleteById(id);
  }
}
