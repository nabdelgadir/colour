import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  BelongsToAccessor,
} from '@loopback/repository';
import {Pink} from '../models';
import {DsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class PinkRepository extends DefaultCrudRepository<
  Pink,
  typeof Pink.prototype.id
> {
  // EDITED HERE
  public readonly pinks: HasManyRepositoryFactory<
    Pink,
    typeof Pink.prototype.id
  >;
  public readonly pink: BelongsToAccessor<Pink, typeof Pink.prototype.id>;
  constructor(@inject('datasources.ds') dataSource: DsDataSource) {
    super(Pink, dataSource);

    // EDITED HERE
    this.pink = this._createBelongsToAccessorFor(
      'pink',
      Getter.fromValue(this),
    );
    this.pinks = this.createHasManyRepositoryFactoryFor(
      'pinks',
      Getter.fromValue(this),
    );
  }
}
