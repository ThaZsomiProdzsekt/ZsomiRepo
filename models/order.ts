import * as mongoose from 'mongoose';
import { IMeal, Meal } from "./meal";
// import { Meal } from "./meal";

const Schema = mongoose.Schema;

interface IOrder extends mongoose.Document {
    orderDate: Date;
    order: [Meal];

}

export const OrderSchema = new Schema({
    orderDate: {
        type: Date,
        required: true
    },
    order: {
        type: [Meal],
        required: true
    },
});