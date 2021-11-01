import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {PilzLocation, PilzLocationRelations} from '../models';

export class PilzLocationRepository extends DefaultCrudRepository<
  PilzLocation,
  typeof PilzLocation.prototype.locationID,
  PilzLocationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(PilzLocation, dataSource);
  }
}
