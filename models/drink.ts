import * as mongoose from 'mongoose';
import {IMeal, MealSchema} from "./meal";
import { drinksDTO } from "../DTOs/drinksDTO";
import {TableBooking} from "./tableBooking";

const Schema = mongoose.Schema;

export interface IDrink extends mongoose.Document {
    name: String;
    price: Number;
    size: String;
    liter: Number;
    calories: Number;
    sugar: Number;
    cold: Boolean;
    hot: Boolean;
    amountOfAvailable: Number;
    alcoholPercentage: Number;
    sugarFree: Boolean;
    fruityDrink: Boolean;
    caffeine: Number;
    everythingElse: String;
    created_date: Date;
}

export const DrinkSchema = new Schema({
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
        required: true
    },
    liter: {
        type: Number,
        required: true
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
        required: true
    },
    alcoholPercentage: {
        type: Number,
        required: true,
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

export const Drink = mongoose.model<IDrink>('Drink', DrinkSchema);

export function addNewDrink(drinksDTO: drinksDTO, callback: Function) {
    let drink = new Drink();
    drink.name = drinksDTO.name;
    drink.price = drinksDTO.price;
    drink.size = drinksDTO.size;
    drink.liter = drinksDTO.liter;

    drink.save( (err, product) => {
        if (err) {
            console.log('Error at adding new Drink: ' + err);
            callback(err);
        }
    });
}
