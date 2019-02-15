import {post, param, requestBody, get} from '@loopback/rest';
import {PinkRepository} from '../repositories/';
import {Pink} from '../models/';
import {repository} from '@loopback/repository';

export class PinkPinksController {
  constructor(
    @repository(PinkRepository)
    protected pinkRepository: PinkRepository,
  ) {}

  @post('/pinks/{id}/pink')
  async createOrder(
    @param.path.number('id') pinkId: typeof Pink.prototype.id,
    @requestBody() pinkData: Pink,
  ): Promise<Pink> {
    return await this.pinkRepository.pinks(pinkId).create(pinkData);
  }

  @get('/pinks/{id}/pink')
  async getPink(
    @param.path.number('id') pinkId: typeof Pink.prototype.id,
  ): Promise<Pink> {
    return await this.pinkRepository.pink(pinkId);
  }
}
