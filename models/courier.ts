import * as mongoose from 'mongoose';
import { IOrder, OrderSchema, Order } from "./order";
import {IMeal, MealSchema} from "./meal";
import {DiscountSchema, IDiscount} from "./discount";

const Schema = mongoose.Schema;
// megbasszák a kurva anyádat

export interface ICourier extends mongoose.Document {
    onItsWay: Boolean;
    currentlyHandling: [];
    departedAt: Date;
    willArrive: Date;
    currentLocation: String;
    currentlyOnCar: Boolean;
    currentlyOnBicycle: Boolean;
    currentlyOnBike: Boolean;
    name: String;
    created_date: Date;
}

export const CourierSchema = new Schema({
    onItsWay: {
        type: Boolean,
        required: false,
        default: false
    },
    currentlyHandling: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
        required: false
    },
    departedAt: {
        type: Date,
        required: false
    },
    willArriveAt: {
        type: Date,
        required: false
    },
    currentLocation: {
        type: String,
        required: false
    },
    currentlyOnCar: {
        type: Boolean,
        required: false,
        default: false
    },
    currentlyOnBike: {
        type: Boolean,
        required: false,
        default: false
    },
    currentlyOnBicycle: {
        type: Boolean,
        required: false,
        default: false
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    created_date: {
        type: Date,
        required: false,
        default: Date.now
    }
});

export const Courier = mongoose.model<ICourier>('Courier', CourierSchema);