import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pilz, PilzRelations, PilzLocation} from '../models';
import {PilzLocationRepository} from './pilz-location.repository';

export class PilzRepository extends DefaultCrudRepository<
  Pilz,
  typeof Pilz.prototype.pilzID,
  PilzRelations
> {

  public readonly pilzLocations: HasManyRepositoryFactory<PilzLocation, typeof Pilz.prototype.pilzID>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PilzLocationRepository') protected pilzLocationRepositoryGetter: Getter<PilzLocationRepository>,
  ) {
    super(Pilz, dataSource);
    this.pilzLocations = this.createHasManyRepositoryFactoryFor('pilzLocations', pilzLocationRepositoryGetter,);
    this.registerInclusionResolver('pilzLocations', this.pilzLocations.inclusionResolver);
  }
}
