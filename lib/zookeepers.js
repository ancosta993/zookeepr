const fs = require('fs');
const path = require('path');

function filterByQuery(query, zookeepers) {
   let filteredResults = zookeepers;
   if (query.age) {
      filteredResults = filteredResults.filter(
         // since our form data will be coming in as strings, and our JSOn is stroing age as a number, we must convert the query string to a number to perform a comparsion:
         (zookeepers) => zookeepers.age === Number(query.age)
      );
   }
   if (query.favoriteAnimal) {
      filteredResults = filteredResults.filter ((zookeepers) => zookeepers.favoriteAnimal === query.favoriteAnimal);
   }
   if (query.name) {
      filteredResults = filteredResults.filter((zookeepers) => zookeepers.name = query.name);
   }

   return filteredResults;
}

function findById(id, zookeepers){
   const result = zookeepers.filter((zookeepers) => zookeepers.id === id)[0];
   return result;
}

function createNewZookeepers(body, zookeepers){
   const zookeeper = body;
   zookeepers.push(zookeeper);
   fs.writeFileSync(
      path.join(__dirname, '../data/zookeepers.json'),
      JSON.stringify({ zookeepers }, null, 2)
   );
   return zookeeper;
}

function validateZookeepers (zookeeper) {
   if (!zookeeper.name || typeof zookeeper.name !== "string") {
      return false;
   } 
   if(!zookeeper.age || typeof zookeeper.age !== 'number'){
      return false;
   }
   if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string'){return false;}

   return true;
}

module.exports = {
   filterByQuery,
   findById,
   createNewZookeepers,
   validateZookeepers,
};