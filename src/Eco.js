export default class Eco {
  constructor(entityFactory, componentCollection) {
    this.entityFactory = entityFactory;
    this.componentCollection = componentCollection;
  }

  /**
   * Creates a component definition
   *
   * @param {string}  name  the unique name for the component
   * @param {mixed}   data  the default data for the component
   *
   * @returns {object} the component object
   */
  createComponent(name, data) {
    return this.componentCollection.set(name, data);
  }

  /**
   * Create a new entity with a unique id
   *
   * @returns {Entity} the new entity instance
   */
  createEntity() {
    return this.entityFactory.create();
  }
}
