import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {Purple, Blue} from '../models';
import {DsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BlueRepository} from '../repositories';

export class PurpleRepository extends DefaultCrudRepository<
  Purple,
  typeof Purple.prototype.id
> {
  public readonly blue: BelongsToAccessor<Blue, typeof Blue.prototype.id>;
  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
    @repository.getter('BlueRepository')
    blueRepositoryGetter: Getter<BlueRepository>,
  ) {
    super(Purple, dataSource);
    this.blue = this.createBelongsToAccessorFor('blue', blueRepositoryGetter);
  }
}
