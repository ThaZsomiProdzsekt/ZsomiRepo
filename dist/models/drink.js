"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.DrinkSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false,
        default: 0
    },
    size: {
        type: String,
        required: false,
        default: 'Normal'
    },
    liter: {
        type: Number,
        required: false,
        default: 0.5
    },
    calories: {
        type: Number,
        required: false,
        default: 0
    },
    sugar: {
        type: Number,
        required: false,
        default: 0
    },
    cold: {
        type: Boolean,
        required: false,
        default: true
    },
    hot: {
        type: Boolean,
        required: false,
        default: true
    },
    amountOfAvailable: {
        type: Number,
        required: false,
        default: 0
    },
    alcoholPercentage: {
        type: Number,
        required: false,
        default: 0
    },
    sugarFree: {
        type: Boolean,
        required: false,
        default: true
    },
    fruityDrink: {
        type: Boolean,
        required: false,
        default: false
    },
    caffeine: {
        type: Number,
        required: false,
        default: 0
    },
    everythingElse: {
        type: String,
        required: false,
        default: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.Drink = mongoose.model('Drink', exports.DrinkSchema);
function addNewDrink(drinksDTO, callback) {
    let drink = new exports.Drink();
    drink.name = drinksDTO.name;
    drink.price = drinksDTO.price;
    drink.size = drinksDTO.size;
    drink.liter = drinksDTO.liter;
    drink.save((err, product) => {
        if (err) {
            console.log('Error at adding new Drink: ' + err);
            callback(err);
        }
    });
}
exports.addNewDrink = addNewDrink;
//# sourceMappingURL=drink.js.map