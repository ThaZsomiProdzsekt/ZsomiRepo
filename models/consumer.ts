import * as mongoose from 'mongoose';
import { IOrder, OrderSchema, Order } from "./order";
import { ConsumersDTO } from "../DTOs/consumersDTO";

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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
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

export function addNewConsumer(consDTO: ConsumersDTO, callback: Function) {
    let consumer = new Consumer();
    consumer.name = consDTO.name;

    consumer.save((err, product) => {
        if (err) {
            console.log('Error at addNewConsumer function (MODEL): ' + err);
            callback(err, null);
        }
        if (product){
            console.log('Successful Product created at addNewConsumer function (MODEL): ' + product);
            callback(null, consumer);
        }
    });
}

