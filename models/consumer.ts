import * as mongoose from 'mongoose';
import { IOrder, OrderSchema, Order } from "./order";

const Schema = mongoose.Schema;

export interface IConsumer extends mongoose.Document {
    name: String;
    phone: String;
    locationsWhereOrdered: String[];
    orders: any[];
    tableBookings: Number;
    otherInformation: String;
    created_date: Date;
}

export const ConsumerSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    locationsWhereOrdered: {
        type: [String],
        required: false,
    },
    orders: {
        type: [Order],
        required: false,
    },
    otherInformation: {
        type: String,
        required: false
    },
    tableBookings: {
        type: Number,
        required: false,
        default: 0
    },
    created_date: {
        type: Date,
        required: false,
        default: Date.now
    }
});

export var Consumer = mongoose.model<IConsumer>('Consumer', ConsumerSchema);

