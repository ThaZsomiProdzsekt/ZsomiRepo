import * as mongoose from 'mongoose';
import { IMeal, Meal } from "./meal";
import {IDrink, Drink, DrinkSchema} from "./drink";
// import { Meal } from "./meal";

const Schema = mongoose.Schema;

// Itten most a faszom se tudja, hogy konkrétan mégis mi a faszról van szó...
export interface IDiscount extends mongoose.Document {
    meals: [];
    currentlyAlive: Boolean;
    drinks: [];
    startsAt: Date;
    endsAt: Date;
    discountedAmountsLeft: Number;
    discountedPrice: Number;
    created_date: Date;
}

export const DiscountSchema = new Schema({
    meals: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Meal',
        required: false
    },
    currentlyAlive: {
        type: Boolean,
        required: false,
        default: false
    },
    drinks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Drink',
        required: false
    },
    startsAt: {
        type: Date,
        required: false
    },
    endsAt: {
        type: Date,
        required: false
    },
    discountedAmountsLeft: {
        type: Number,
        required: false
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const Discount = mongoose.model<IDiscount>('Discount', DiscountSchema);