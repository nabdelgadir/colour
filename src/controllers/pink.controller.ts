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
import {Pink} from '../models';
import {PinkRepository} from '../repositories';

export class PinkController {
  constructor(
    @repository(PinkRepository)
    public pinkRepository: PinkRepository,
  ) {}

  @post('/pinks', {
    responses: {
      '200': {
        description: 'Pink model instance',
        content: {'application/json': {schema: {'x-ts-type': Pink}}},
      },
    },
  })
  async create(@requestBody() pink: Pink): Promise<Pink> {
    return await this.pinkRepository.create(pink);
  }

  @get('/pinks/count', {
    responses: {
      '200': {
        description: 'Pink model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Pink)) where?: Where,
  ): Promise<Count> {
    return await this.pinkRepository.count(where);
  }

  @get('/pinks', {
    responses: {
      '200': {
        description: 'Array of Pink model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Pink}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Pink)) filter?: Filter,
  ): Promise<Pink[]> {
    return await this.pinkRepository.find(filter);
  }

  @patch('/pinks', {
    responses: {
      '200': {
        description: 'Pink PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() pink: Pink,
    @param.query.object('where', getWhereSchemaFor(Pink)) where?: Where,
  ): Promise<Count> {
    return await this.pinkRepository.updateAll(pink, where);
  }

  @get('/pinks/{id}', {
    responses: {
      '200': {
        description: 'Pink model instance',
        content: {'application/json': {schema: {'x-ts-type': Pink}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Pink> {
    return await this.pinkRepository.findById(id);
  }

  @patch('/pinks/{id}', {
    responses: {
      '204': {
        description: 'Pink PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() pink: Pink,
  ): Promise<void> {
    await this.pinkRepository.updateById(id, pink);
  }

  @put('/pinks/{id}', {
    responses: {
      '204': {
        description: 'Pink PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pink: Pink,
  ): Promise<void> {
    await this.pinkRepository.replaceById(id, pink);
  }

  @del('/pinks/{id}', {
    responses: {
      '204': {
        description: 'Pink DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pinkRepository.deleteById(id);
  }
}
