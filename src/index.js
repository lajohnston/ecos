import ComponentCollection from './components/ComponentCollection';
import Component from './components/Component';
import NullComponent from './components/NullComponent';

import Eco from './Eco';

import Entity from './entities/Entity';
import IdFactory from './entities/IdFactory';
import IteratorFactory from './entities/IteratorFactory';
import EntityIterator from './entities/EntityIterator';
import FilteredIterator from './entities/FilteredIterator';

function createInstanceFactory(Newable) {
  return {
    create(...args) {
      return new Newable(...args);
    },
  };
}

function createComponentCollection() {
  const collection = new ComponentCollection(
    createInstanceFactory(Component)
  );

  collection.setNullObject(new NullComponent());

  return collection;
}

function createEcoInstance() {
  const componentCollection = createComponentCollection();

  return new Eco(
    componentCollection,
    new IdFactory(1),
    createInstanceFactory(Entity),
    new IteratorFactory(EntityIterator, FilteredIterator)
  );
}

export default createEcoInstance;
