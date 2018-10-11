import * as mongoose from 'mongoose';
import { Model, model } from 'mongoose';
import { IMeal, Meal, MealSchema } from "./meal";
import { IDrink, Drink, DrinkSchema } from "./drink";
import { IDiscount, Discount, DiscountSchema } from "./discount";
import {OrderDTO} from "../DTOs/orderDTO";
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
        type: mongoose.SchemaTypes.Date,
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
        type: mongoose.SchemaTypes.String,
        required: false
    },
    consumerPhone: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    consumerAddress: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    orderFromPhone: {
        type: mongoose.SchemaTypes.Boolean,
        required: false,
        default: false
    },
    orderFromWeb: {
        type: mongoose.SchemaTypes.Boolean,
        required: false,
        default: true
    },
    orderPersonally: {
        type: mongoose.SchemaTypes.Boolean,
        required: false,
        default: false
    },
    tableReservations: {
        type: mongoose.SchemaTypes.Number,
        required: false,
        default: 0
    },
    created_date: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    }
});

export var Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);

export function addNewOrder(orderDTO: OrderDTO, callback: Function) {
    let name = orderDTO.consumerName;
    let order = new Order();
    order.consumerName = name;

    order.save( (err, product) => {
        if (err) {
            console.log('Error at addNewConsumer function (MODEL): ' + err);
            callback(err, null);
        }
        if (product) {
            console.log('Successful Product created at addNewConsumer function (MODEL): ' + product);
            callback(null, product);
        }
    })
}