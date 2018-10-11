import * as mongoose from 'mongoose';
import {Order} from "./order";
import {ConsumersDTO} from "../DTOs/consumersDTO";
//import {ConsumerEntities} from "../exceptions/inappropriateInputExceptions/inappropriateInputException";
import {MissingNameException} from "../exceptions/missingNameException";
import {ValidationCheckers} from "../helpers/validationCheckers";
import {
    ConsumerDocNotFoundException,
    ConsumerNotFoundEntities
} from "../exceptions/missingDocumentExceptions/consumerDocNotFoundException";
import {InapprConsumerInputEntities,
    InappropriateConsumerInputException} from "../exceptions/inappropriateInputExceptions/inappropriateConsumerInputException";
import {CustomStringifiers} from "../helpers/customStringifiers";

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
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
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

export function getConsumersOrders(custId: string, callback: Function) {
    if (!ValidationCheckers.stringExistsAndNotEmpty(custId)) {
        let entities: InapprConsumerInputEntities[] = [];
        entities.push(InapprConsumerInputEntities.consId);
            throw new InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [custId], entities);
    }

    Consumer.findById(custId).populate('orders').exec(function (err, doc) {
        if (err) callback(err, null);
        if (doc) callback(null, doc);
    });
}

export function findConsumersBasedOnOtherInfo(otherInf: string, callback: Function) {
    if (!ValidationCheckers.stringExistsAndNotEmpty(otherInf)) {
        let entities: InapprConsumerInputEntities[] = [];
        entities.push(InapprConsumerInputEntities.consOtherInfo);
            throw new InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [otherInf], entities);
    }

    Consumer.find({ otherInformation: { $regex: ".*" + otherInf + ".*" }}).then((doc) => {
        console.log('Consumers found based on other information');
        callback(null, doc);
    }).catch((err) => {
        console.log('Error at tyring to find Consumer!');
        callback(err, null);
    });
}

export function addNewConsumer(consDTO: ConsumersDTO, callback: Function) {
    if (!ValidationCheckers.isDefined(consDTO)) {
        throw new InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [], []);
    }
    let consumer = new Consumer();
    if (consDTO.name != '' && consDTO.name.length > 0)      consumer.name = consDTO.name.toLowerCase();
    if (consDTO.phone != '' && consDTO.phone.length > 0)    consumer.phone = CustomStringifiers.removeWhitespaces(consDTO.phone);
    if (consDTO.locationsWhereOrdered.length > 0)           consumer.locationsWhereOrdered = consDTO.locationsWhereOrdered;
    if (consDTO.orders.length > 0)                          consumer.orders = consDTO.orders;
    if (consDTO.otherInformation != '' &&
        consDTO.otherInformation.length > 0)                consumer.otherInformation = consDTO.otherInformation;
                                                            consumer.tableBookings = consDTO.tableBookings;

    consumer.save((err, product) => {
        if (err) {
            console.log('Error at addNewConsumer function (MODEL): ' + err);
            callback(err, null);
        }
        if (product) {
            console.log('Successful Product created at addNewConsumer function (MODEL): ' + product);
            callback(null, consumer); // Itt lehet consumer helyett product kéne, faszomtuggya má.
        }
    });
}

// TODO: to be tested.
export async function setConsumerValues(conDTO: ConsumersDTO, callback: Function) {
    console.log(conDTO.name);
    console.log(conDTO.phone);
    if (!ValidationCheckers.stringExistsAndNotEmpty(conDTO.name) && !ValidationCheckers.stringExistsAndNotEmpty(conDTO.phone)) {
        let entities: InapprConsumerInputEntities[] = [];
        entities.push(InapprConsumerInputEntities.consName);   entities.push(InapprConsumerInputEntities.consPhone);
            throw new InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!',
                500, [conDTO.name, conDTO.phone], entities);
    }

    //console.log('We have not yet get a "MissingNameException", we are going to go to the "getCustomerId_Phone_Name" !!');
    let custId = await getCustomerId_Phone_Name(conDTO.name, conDTO.phone);
    custId = custId.toString();
    console.log('custid');
    console.log(custId);
    console.log(typeof custId);
    //TODO: To be  tested
    if (!ValidationCheckers.stringExistsAndNotEmpty(custId)) {
        let entities: ConsumerNotFoundEntities[] = [];
        entities.push(ConsumerNotFoundEntities.consName);   entities.push(ConsumerNotFoundEntities.consPhone);
            throw new ConsumerDocNotFoundException('Could not find Consumer Doc based on the parameters!', 500, entities);
    }

    let update = conDTO.propertiesAndValues();
    //console.log('udpate: ');
    //console.log(update);

    let options = { new: true };
    // TODO: Ez a szar kurvára nem működik, itt valamit baszogatni kéne a tömbstruktúrán az udpate-nél vagy valami
    Consumer.findByIdAndUpdate(custId, { $set: { update } }, options,(err, doc) => {
        if (err) {
            console.log('err: ');
            console.log(err);
            callback(err, null);
        }
        if (doc) {
            console.log('doc: ');
            console.log(doc);
            callback(null, doc);
        }
    });

/*
    let lofasz: string = 'asdasdasda'
    Object.keys(conDTO).forEach((key, value) => {
        console.log(key, value);
        if (value && key) {
            Consumer.findByIdAndUpdate(custId, {
                $set: {lofasz}
            }, {}, (err, doc) => {
                callback(err, doc);
            });
        }
    })
*/

}

// TODO: testing, nagyjából le van tesztelve
export async function getCustomerId_Phone_Name(name?: string, phone?: string): Promise<string> {
    console.log('Entered "getCustomerId_Phone_Name"-ba');
    /*console.log(name);
    console.log(typeof name);
    console.log(phone);
    console.log(typeof phone);*/
    let ret = null;
    // If the phone was given as the parameter.

    if (!ValidationCheckers.stringExistsAndNotEmpty(name) && !ValidationCheckers.stringExistsAndNotEmpty(phone)) {
        let entities: InapprConsumerInputEntities[] = [];
        entities.push(InapprConsumerInputEntities.consName);   entities.push(InapprConsumerInputEntities.consPhone);
        throw new InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!',  500, [name, phone], entities);
    }

    if (ValidationCheckers.stringExistsAndNotEmpty(phone)) {
        console.log('Beléptünk a phone keresésbe!');
        await Consumer.findOne({'phone': {$regex: CustomStringifiers.removeWhitespaces(phone)}}).then((doc) => {
            if (doc) {
                console.log('Consumer ID successfully found at "getCustomerId_Phone_Name" at PHONE :' + doc.name);
                ret = doc._id;
            }
        }).catch((err) => {
            console.log('Error at "getCustomerId_Phone_Name" :' + err);
            throw err;
        });
        console.log('Ret megint: ');
        console.log(ret);
        // If name was given as the parameter.
    }
    if (ValidationCheckers.stringExistsAndNotEmpty(name) && (ret === null)) {
        console.log('Beléptünk a name keresésbe!');
        await Consumer.findOne({'name': {$regex: name.toLowerCase() }}).then((doc) => {
            if (doc) {
                console.log('Consumer ID successfully found at "getCustomerId_Phone_Name" at NAME :' + doc.name);
                ret = doc._id;
            }
        }).catch((err) => {
            console.log('Error at "getCustomerId_Phone_Name" :' + err);
            throw err;
        });
    }
    console.log('Vége van a 2 ifnek');
    return ret;
}

// nem kell
export function getCustomerNameFromPhone(phone: string, callback: Function) {
    if (!ValidationCheckers.stringExistsAndNotEmpty(phone)) {
        let entities: InapprConsumerInputEntities[] = [];
        entities.push(InapprConsumerInputEntities.consPhone);
        throw new InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!',  500, [phone], entities);
    }

    Consumer.findOne({'phone': {$regex: '.*' + phone + '.*'}}).then((doc) => {
        console.log('Consumer name successfully found at "getCustomerNameFromPhone" :' + doc.name);
        callback(null, doc.name);
    }).catch((err) => {
        console.log('Error at "getCustomerNameFromPhone" :' + err);
        callback(err, null);
    });
}

/*
// ez valszeg gecire nem kéne
exp
        console.log('Error at "getCustomerIdFromPhone" :' + err);
        callback(err, null);
    });ort function getCustomerIdFromPhone(phone: String, callback: Function) {
    Consumer.findOne({'phone': {$regex: '.*' + phone + '.*'}}).then((doc) => {
        console.log('Consumer ID successfully found at "getCustomerIdFromPhone" :' + doc.name);
        callback(null, doc._id);
    }).catch((err) => {
}
*/

// nem kell
export function getCustomerPhoneFromName(name: string, callback: Function) {
    if (!ValidationCheckers.stringExistsAndNotEmpty(name)) {
        let entities: InapprConsumerInputEntities[] = [];
        entities.push(InapprConsumerInputEntities.consName);
        throw new InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!',  500, [name], entities);
    }

    Consumer.findOne({'name': {$regex: '.*' + name + '.*'}}).then((doc) => {
        console.log('Consumer ID successfully found at "getCustomerPhoneFromName" :' + doc.name);
        callback(null, doc._id);
    }).catch((err) => {
        console.log('Error at "getCustomerPhoneFromName" :' + err);
        callback(err, null);
    });
}
