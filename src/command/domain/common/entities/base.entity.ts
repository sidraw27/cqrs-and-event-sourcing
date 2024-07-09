export interface Model {
  [key: string]: any;
}

export type EntityId = string;

export abstract class Entity<M extends Model> {
  public readonly id: EntityId;

  protected readonly model: M;

  protected constructor(id: EntityId, model: M) {
    this.id = id;
    this.model = model;
  }

  public isPersisted() {
    return this.id !== null;
  }
}
