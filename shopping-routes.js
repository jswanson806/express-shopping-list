
const express = require("express");
const ExpressError = require("./expressError");
const fakeDb = require("./fakeDb");

const app = express();

const router = new express.Router();


router.get('/', (req, res) => {
    res.status(200).json(items);
})

router.post('/', (req, res) => {
    if(!req.body.name) {
        throw new ExpressError("Must include name", 404);
    }
    items.push(req.body);
    res.status(201).json(`{added: {name: ${req.body.name}, price: ${req.body.price}}}`);
})

router.get('/:name', (req, res) => {
    const item = items.find(i => i.name == req.params.name);
    if(item === undefined){
        throw new ExpressError("Invalid item", 404);
    }
    res.status(200).json(item);
})

router.patch('/:name', (req, res) => {
    const foundItem = items.find(i => i.name == req.params.name);
    if(foundItem === undefined){
        throw new ExpressError("Invalid item", 404);
    }
    foundItem.name = req.body.name;
    res.status(200).json({item: foundItem})
})

router.delete('/:name', (req, res) => {
    const foundItem = items.findIndex(i => i.name == req.params.name);
    if(foundItem === -1){
        throw new ExpressError("Item not found", 404);
    }
    items.splice(foundItem, 1);
    res.status(200).json({message: "Deleted"})
})

module.exports = router;