import * as mongoose from 'mongoose';
import { IMeal, Meal, MealSchema } from "./meal";
import { IDrink, Drink, DrinkSchema } from "./drink";
import { IDrink, Drink, DrinkSchema } from "./discount";
// import { Meal } from "./meal";

const Schema = mongoose.Schema;

export interface IOrder extends mongoose.Document {
    orderDate: Date;
    orderMeal: IMeal[];
    orderDrink: IDrink[];
    created_date: Date;
}

export const OrderSchema = new Schema({
    orderDate: {
        type: Date,
        required: true
    },
    orderMeal: {
        type: [MealSchema],
        required: false
    },
    orderDrink: {
        type: [DrinkSchema],
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const TableBooking = mongoose.model<ITableBooking>('TableBooking', TableBookingSchema);