const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;

const app = express();

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
}


app.get('/api/animals', (req, res) => {
   let results = animals;
   if(req.query){
      results = filterByQuery(req.query, results);
   }
   res.json(results);
});

app.listen(PORT, ()=> {
   console.log(`API server now on port ${PORT}!`);
});