# Eco Entity Component System

Eco is an entity component system for JavaScript/HTML5 games that lets you
define your components and game logic as decoupled POJO objects and functions.
You can use it as part of a custom game engine, and also as a glue layer to
keep your game logic decoupled from the game framework and libraries of your
choice.

The framework is under development, but below is the API it is planned to
implement.

## Components

Components are data structures. They don't need to contain any logic, so you
can define them either as simple objects containing default values, or as a
function that returns the object data.

    var eco = new Eco();

    eco.createComponent(
        'position',     // the name of the component
        {               // the component's default values
            x: 0,
            y: 0
        }
    );

You can also define a component constructor function. The function is called
each time a component is added to an entity so you can define a component as
a class and return a new instance from the function.

    // Define a class
    var Vector = function(x, y, speed) {
        this.x = x || 0;
        this.y = y || 0;
        this.speed = speed || 1;
    }

    // Define methods
    Vector.prototype.getVectorX = function() {
        return this.x * this.speed;
    }

    // The function will be called each time a component is added to an entity
    // Each entity will therefore have a new instance of Vector
    eco.createComponent('vector', function(data) {
        return new Vector(data.x, data.y);
    });

## Entities

Entities are simply a collection of components. Components can be added and
removed at runtime allowing behaviour to be changed dynamically.

    var entity = eco.entity()
        .add('isPlayer')
        .add('position', { x: 0, y: 0 })
        .add('vector', { x: 0, y: 0 })
        .add('friction', { value: -1 })
        .add('gravity', { value: -1 });

    // Add components
    entity.add('foo', { bar: 'baz' });

    // Remove components
    entity.remove('gravity');
    entity.has('gravity');      // false

    // Access components
    entity.get('health').amount = 100;

    // Retrieve entity
    eco.entity(123).getId();    // 123

## Systems

Systems are your game logic and behaviour. Eco doesn't handle these, but
provides methods to iterate through entities that have certain combinations of
components.

    // Iterate through entities with 'position' and 'vector' components
    eco.filter(['position', 'vector'], function(position, vector, entity) {
        // Update entity position based on its movement vector values
        position.x += vector.getVectorX();
        position.y += vector.getVectorY();

        /**
         * This callback is called for each matching entity
         * The components for each entity are injected in for you
         *
         * The entity itself is passed as the last argument
         */
    });

   /**
    * Get an array of entities that have at least one component.
    * Eco only stores component data, so entities without any
    * components won't be returned
    */
    eco.getEntities();
