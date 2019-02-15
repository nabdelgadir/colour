import {post, param, requestBody} from '@loopback/rest';
import {BlueRepository} from '../repositories/';
import {Blue, Purple} from '../models/';
import {repository} from '@loopback/repository';

export class BluePurplesController {
  constructor(
    @repository(BlueRepository)
    protected blueRepository: BlueRepository,
  ) {}

  @post('/blues/{id}/purple')
  async createpurple(
    @param.path.number('id') blueId: typeof Blue.prototype.id,
    @requestBody() purpleData: Purple,
  ): Promise<Purple> {
    return await this.blueRepository.purples(blueId).create(purpleData);
  }
}
