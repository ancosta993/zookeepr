// dependencies
const fs = require('fs');
const path = require('path');



function filterByQuery (query, animalsArray) {
   let personalityTraits = [];
   // Note that we save the animalsArray as filteredResults here:
   let filteredResults = animalsArray;
   if (query.personalityTraits){
      // Save personalityTrais as a dedicated array.
      // Of personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string'){
         personalityTraits = [query.personalityTraits]
      } else {
         personalityTraits = query.personalityTraits;
      }

      personalityTraits.forEach(trait => {
         filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
      });
   }

   if (query.diet){
      filteredResults = filteredResults.filter(animals => animals.diet === query.diet);
   }

   if (query.species) {
      filteredResults = filteredResults.filter(animals => animals.species === query.species);
   }

   if (query.name) {
      filteredResults = filteredResults.filter(animals => animals.name === query.name);
   }
   return filteredResults;
};

function findById(id, animalsArray){
   const result = animalsArray.filter(animal => animal.id === id)[0];
   return result;
};

function createNewAnimal(body, animalsArray){
   console.log(body);
   // our function's main code will go here!
   const animal = body;
   animalsArray.push(animal);

   fs.writeFileSync(
      path.join(__dirname, '../data/animals.json'),
      JSON.stringify({ animals: animalsArray }, null, 2)
   );
   // return finished code to post route for response
   return animal;
};

function validateAnimal(animal) {
   if (!animal.name || typeof animal.name!== 'string') {
      return false;
   }
   if (!animal.species || typeof animal.species !== 'string') {
      return false;
   }
   if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
   }
   if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
   }
   return true;
};

module.exports = {
   filterByQuery,
   findById,
   createNewAnimal,
   validateAnimal
};