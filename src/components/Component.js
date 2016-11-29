export default class Component {
  constructor(definition) {
    this.entities = {};
    this.factory = getFactory(definition); // eslint-disable-line no-use-before-define
  }

  /**
   * Get the component data belonging to a given entity
   *
   * @param {number}  entityId  the entity's unique id
   *
   * @returns {mixed} the entity's component data
   */
  get(entityId) {
    return this.entities[entityId];
  }

  /**
   * Set the component data for a given entity
   *
   * @param {number}  entityId  the entity's unique id
   * @param {object}  data  the data to override the defaults
   *
   * @returns {mixed} the entity's component data
   */
  set(entityId, data) {
    this.entities[entityId] = this.factory(data);
  }

  /**
   * Indicates whether the component contains data for the given entity id
   *
   * @param   {number}  entityId  the entity's unique id
   *
   * @returns {boolean} true if the component has data for the entity,
   *                    otherwise false
   */
  has(entityId) {
    return Object.hasOwnProperty.call(this.entities, entityId);
  }

  /**
   * Merge two objects, returning the merged data without affecting
   * the originals
   *
   * @param   {object}  defaultData the base default data
   * @param   {object}  data  the data to merge in
   *
   * @returns {object}  the merged data
   */
  static mergeObjects(defaultData, data) {
    const instance = {};

    Object.keys(defaultData).forEach((key) => {
      instance[key] = defaultData[key];
    });

    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        instance[key] = data[key];
      });
    }

    return instance;
  }
}

function getFactory(definition) {
  const type = typeof definition;

  if (type === 'function') {
    return definition;
  } else if (type === 'object' && definition !== null) {
    return data => Component.mergeObjects(definition, data);
  } else if (type === 'undefined') {
    return data => data;
  }

  return () => definition;
}
