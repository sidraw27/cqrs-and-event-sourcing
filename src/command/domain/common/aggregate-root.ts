// eslint-disable-next-line max-classes-per-file
import { AggregateRoot as CQRSAggregateRoot } from '@nestjs/cqrs';
import { Entity, Model, EntityId } from './entities';

class ImplicitEntity<M extends Model> extends Entity<M> {
  get _model() {
    return this.model;
  }

  public static create<M extends Model>(id: EntityId, model: M) {
    return new ImplicitEntity(id, model);
  }
}

export abstract class AggregateRoot<M extends Model> extends CQRSAggregateRoot {
  private entity: ImplicitEntity<M>;

  get id() {
    return this.entity.id;
  }

  get model() {
    return this.entity._model;
  }

  protected constructor(id: EntityId, model: M) {
    super();
    this.entity = ImplicitEntity.create(id, model);
  }

  public isPersisted() {
    return this.entity.isPersisted();
  }
}
