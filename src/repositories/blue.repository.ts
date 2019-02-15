import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Blue, Purple} from '../models';
import {DsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PurpleRepository} from '.';

export class BlueRepository extends DefaultCrudRepository<
  Blue,
  typeof Blue.prototype.id
> {
  public readonly purples: HasManyRepositoryFactory<
    Purple,
    typeof Purple.prototype.id
  >;
  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
    @repository.getter('PurpleRepository')
    getPurpleRepository: Getter<PurpleRepository>,
  ) {
    super(Blue, dataSource);
    this.purples = this.createHasManyRepositoryFactoryFor(
      'purples',
      getPurpleRepository,
    );
  }
}
