const fs = require('fs');
jest.mock('fs');

const {filterByQuery, findById, createNewZookeepers, validateZookeepers} = require('../lib/zookeepers.js');
const {zookeepers} = require('../data/zookeepers.json');
const { create } = require('domain');

test('test the createNewZookeepers function', () => {
   const zookeeper = createNewZookeepers(
      { name: "Darlene", id: "jhgdja3ng2" },
      zookeepers
   );

   expect(zookeeper.name).toBe('Darlene');
   expect(zookeeper.id).toBe('jhgdja3ng2');
});

test('filter zookeepers', () => {
   const startingZookeepers = [
      {
         id: "2",
         name: "Raksha",
         age: 31,
         favoriteAnimal: "penguin",
       },
       {
         id: "3",
         name: "Isabella",
         age: 67,
         favoriteAnimal: "bear",
       },
   ];

   const updatedZookeepers = filterByQuery( {age: 31} ,startingZookeepers);
   expect(updatedZookeepers.length).toBe(1);
});

test('find zookeepers by id', () => {
   const zookeepers = [
      {
         id: "2",
         name: "Raksha",
         age: 31,
         favoriteAnimal: "penguin",
       },
       {
         id: "3",
         name: "Isabella",
         age: 67,
         favoriteAnimal: "bear",
       },
   ];

   const result = findById("3", zookeepers);

   expect(result.name).toBe("Isabella");
});

test('validate given zookeeper data', () => {
   const validZookeeper = {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
   };
   const invalidZooKeeper = {
      id: "2",
      name: "Raksha",
      favoriteAnimal: "penguin",
   };

   expect(validateZookeepers(validZookeeper)).toBe(true);
   expect(validateZookeepers(invalidZooKeeper)).toBe(false);
});
