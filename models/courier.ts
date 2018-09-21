import * as mongoose from 'mongoose';
import {IOrder, OrderSchema} from "./order";
import {IMeal, MealSchema} from "./meal";

const Schema = mongoose.Schema;
// megbasszák a kurva anyádat
const Order = mongoose.model<IOrder>('Order', OrderSchema);

export interface ICourier extends mongoose.Document {
    onItsWay: Boolean;
    currentlyHandling: Order;

}

export const CourierSchema = new Schema({

});