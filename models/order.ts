import * as mongoose from 'mongoose';
import {Model, model, mongo} from 'mongoose';
import {IMeal, Meal, MealSchema} from "./meal";
import {IDrink, Drink, DrinkSchema} from "./drink";
import {IDiscount, Discount, DiscountSchema} from "./discount";
import {OrderDTO} from "../DTOs/orderDTO";
import {ValidationCheckers} from "../helpers/validationCheckers";
import {
    InappropriateOrderInputException,
    InapprOrderInputEntities
} from "../exceptions/inappropriateInputExceptions/inappropriateOrderInputException";
import {
    InappropriateConsumerInputException,
    InapprConsumerInputEntities
} from "../exceptions/inappropriateInputExceptions/inappropriateConsumerInputException";
// import { Meal } from "./meal";

const Schema = mongoose.Schema;

export interface IOrder extends mongoose.Document {
    orderDate: Date;
    dueDate: Date;
    orderMeal: [];
    orderDrink: [];
    orderDiscounted: [];
    consumerName: string;
    consumerAddress: string;
    consumerPhone: string;
    orderFromWeb: boolean;
    orderFromPhone: boolean;
    orderPersonally: boolean;
    tableReservations: number;
    belongsToRestaurant: any;
    belongsToConsumer: any;
    created_date: Date;
}

export const OrderSchema = new Schema({
    orderDate: {
        type: mongoose.SchemaTypes.Date,
        required: false
    },
    dueDate: {
        type: mongoose.SchemaTypes.Date,
        required: false,
        default: Date.now
    },
    belongsToRestaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
    },
    belongsToConsumer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Consumer',
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

    order.save((err, product) => {
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

export function getOrderBasedOnDates(begDate: Date, endDate: Date, restId: string, callback: Function) {
    if (!ValidationCheckers.isDefined(begDate) || !ValidationCheckers.isDefined(endDate)) {
        let entities: InapprOrderInputEntities[] = [];
        entities.push(InapprOrderInputEntities.orderDate);
        throw new InappropriateOrderInputException('There was/were missing/empty parameter(s) for query!',
            500, [begDate, endDate], entities);
    }

    Order.find({'orderDate': {$gte: begDate, $lte: endDate}, 'belongsToRestaurant': restId}, (err, doc) => {
        if (err) callback(err);
        if (doc) callback(doc);
    });
}

export function getOrderBasedOnDatesAndCustomer(begDate: Date, endDate: Date, custId: string, restId: string, callback: Function) {
    if (!ValidationCheckers.isDefined(begDate) || !ValidationCheckers.isDefined(endDate)) {
        let entities: InapprOrderInputEntities[] = [InapprOrderInputEntities.orderDate];
        throw new InappropriateOrderInputException('There was/were missing/empty parameter(s) for query!',
            500, [begDate, endDate], entities);
    }
    if (!ValidationCheckers.stringExistsAndNotEmpty(custId)) {
        let entities: InapprConsumerInputEntities[] = [InapprConsumerInputEntities.consId];
        throw new InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!',
            500, [custId], entities);
    }

    Order.find({
            'orderDate':  { $gte: begDate, $lte: endDate },
            'belongsToConsumer': custId,
            'belongsToRestaurant': restId
        },
        (err, doc) => {
            if (err) callback(err, null);
            if (doc) callback(null, doc);
        });
}

function exceptionBuilder() {

}