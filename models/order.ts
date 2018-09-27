import * as mongoose from 'mongoose';
import { Model, model } from 'mongoose';
import { IMeal, Meal, MealSchema } from "./meal";
import { IDrink, Drink, DrinkSchema } from "./drink";
import { IDiscount, Discount, DiscountSchema } from "./discount";
// import { Meal } from "./meal";

const Schema = mongoose.Schema;

export interface IOrder extends mongoose.Document {
    orderDate: Date;
    orderMeal: [];
    orderDrink: [];
    orderDiscounted: [];
    consumerName: String;
    consumerAddress: String;
    consumerPhone: String;
    orderFromWeb: Boolean;
    orderFromPhone: Boolean;
    orderPersonally: Boolean;
    tableReservations: Number;
    created_date: Date;
}

export const OrderSchema = new Schema({
    orderDate: {
        type: Date,
        required: false
    },
    orderMeal: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Meal',
        required: false
    },
    orderDrink: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Drink',
        required: false
    },
    orderDiscount: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Discount',
        required: false
    },
    consumerName: {
        type: String,
        required: false
    },
    consumerPhone: {
        type: String,
        required: false
    },
    consumerAddress: {
        type: String,
        required: false
    },
    orderFromPhone: {
        type: Boolean,
        required: false,
        default: false
    },
    orderFromWeb: {
        type: Boolean,
        required: false,
        default: true
    },
    orderPersonally: {
        type: Boolean,
        required: false,
        default: false
    },
    tableReservations: {
        type: Number,
        required: false,
        default: 0
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export var Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);