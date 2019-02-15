import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  // repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {Pink} from '../models';
import {DsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class PinkRepository extends DefaultCrudRepository<
  Pink,
  typeof Pink.prototype.id
> {
  public readonly pinks: HasManyRepositoryFactory<
    Pink,
    typeof Pink.prototype.id
  >;
  public readonly pink: BelongsToAccessor<Pink, typeof Pink.prototype.id>;
  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
    // @repository.getter('PinkRepository')
    // getPinkRepository: Getter<PinkRepository>,
  ) {
    super(Pink, dataSource);
    // this.pink = this._createBelongsToAccessorFor(
    //   'pink',
    //   // getPinkRepository,
    //   Getter.fromValue(this),
    // );
    this.pinks = this.createHasManyRepositoryFactoryFor(
      'pinks',
      Getter.fromValue(this),
      // getPinkRepository,
    );
  }
}
