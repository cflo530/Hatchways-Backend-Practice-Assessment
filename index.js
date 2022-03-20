const express = require('express');
const data = require('./data.json');

const app = express();
const PORT = process.env.PORT || 3000;

// GET Route to fetch all Recipes
app.get('/recipes', (req, res) => {
    const obj = {};
    obj.recipeNames = new Array();

    for (var key in data.recipes) {
        obj.recipeNames.push(data.recipes[key].name);
    }

    res.send(obj);
});

// GET Route to fetch a single Recipe
app.get('/recipes/details/:recipe', (req, res) => {
    const obj = {};
    obj.details = new Array();
    obj.numSteps = new Array();

    for (var key in data.recipes) {
        if (data.recipes[key].name === req.params.recipe) {
            obj.details.push(data.recipes[key].ingredients);
            obj.numSteps.push(data.recipes[key].instructions.length);
            res.send(obj);
        }
    }

    if(!obj) {
        res.send({});
    }
    
});

// POST Route to add new Recipe


app.listen(PORT, () => console.log(`Running on ${PORT}...`));