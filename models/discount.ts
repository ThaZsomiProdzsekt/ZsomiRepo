import * as mongoose from 'mongoose';
import { IMeal, Meal } from "./meal";
import { IDrink, Drink } from "./drink";
// import { Meal } from "./meal";

const Schema = mongoose.Schema;

// Itten most a faszom se tudja, hogy konkrétan mégis mi a faszról van szó...
interface IDoscount extends mongoose.Document {
    meals: [IMeal];
    currentlyAlive: Boolean;
    drinks: [IDrink];
    startsAt: Date;s
    endsAt: Date;
    discountedAmountsLeft: Number;
    discountedPrice: Number;
}

export const DiscountSchema = new Schema({
    meals: {
        type: [Meal],
        required: false
    },
    currentlyAlive: {
        type: Boolean,
        required: false,
        default: false
    },
    drinks: {
        type: [Drink],
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
    }
});