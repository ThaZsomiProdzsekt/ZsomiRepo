import * as mongoose from 'mongoose';
import {IMeal, MealSchema} from "./meal";

const Schema = mongoose.Schema;

export interface IDrink extends mongoose.Document {
    name: String;
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
}

export const DrinkSchema = new Schema({
    name: {
        type: String,
        required: true
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
    }
});

export const Drink = mongoose.model<IDrink>('Drink', DrinkSchema);