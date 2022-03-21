const express = require('express');
const fs = require('fs');
const data = require('./data.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET Route to fetch all Recipes
app.get('/recipes', (req, res) => {
    const obj = {};
    obj.recipeNames = new Array();

    for (var key in data.recipes) {
        obj.recipeNames.push(data.recipes[key].name);
    }

    return res.send(obj);
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
            return res.send(obj);
        }
    }

    if(!obj) {
         return res.send({});
    }
    
});

// POST Route to add new Recipe
app.post('/recipes', (req, res) => {
    const recipeName = req.body.name;
    const recipes = data.recipes.map(index => index.name);

    if (recipes.includes(recipeName)) {
        return res.status(400).json({ error: "Recipe already exists" });
    } else {
        data.recipes.push(req.body);
        let temp = JSON.stringify(data, null, 2);

        fs.writeFile('data.json', temp, (err) => {
            if(err) {
                return res.status(500).json({ message: err });
            }
        });

        return res.status(201).json({ message: 'New recipe added'});
    }

});

app.listen(PORT, () => console.log(`Running on ${PORT}...`));