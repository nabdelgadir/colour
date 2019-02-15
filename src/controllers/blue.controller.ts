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
import {Blue} from '../models';
import {BlueRepository} from '../repositories';

export class BlueController {
  constructor(
    @repository(BlueRepository)
    public blueRepository: BlueRepository,
  ) {}

  @post('/blues', {
    responses: {
      '200': {
        description: 'Blue model instance',
        content: {'application/json': {schema: {'x-ts-type': Blue}}},
      },
    },
  })
  async create(@requestBody() blue: Blue): Promise<Blue> {
    return await this.blueRepository.create(blue);
  }

  @get('/blues/count', {
    responses: {
      '200': {
        description: 'Blue model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Blue)) where?: Where,
  ): Promise<Count> {
    return await this.blueRepository.count(where);
  }

  @get('/blues', {
    responses: {
      '200': {
        description: 'Array of Blue model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Blue}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Blue)) filter?: Filter,
  ): Promise<Blue[]> {
    return await this.blueRepository.find(filter);
  }

  @patch('/blues', {
    responses: {
      '200': {
        description: 'Blue PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() blue: Blue,
    @param.query.object('where', getWhereSchemaFor(Blue)) where?: Where,
  ): Promise<Count> {
    return await this.blueRepository.updateAll(blue, where);
  }

  @get('/blues/{id}', {
    responses: {
      '200': {
        description: 'Blue model instance',
        content: {'application/json': {schema: {'x-ts-type': Blue}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Blue> {
    return await this.blueRepository.findById(id);
  }

  @patch('/blues/{id}', {
    responses: {
      '204': {
        description: 'Blue PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() blue: Blue,
  ): Promise<void> {
    await this.blueRepository.updateById(id, blue);
  }

  @put('/blues/{id}', {
    responses: {
      '204': {
        description: 'Blue PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() blue: Blue,
  ): Promise<void> {
    await this.blueRepository.replaceById(id, blue);
  }

  @del('/blues/{id}', {
    responses: {
      '204': {
        description: 'Blue DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.blueRepository.deleteById(id);
  }
}
