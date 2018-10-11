"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validationCheckers_1 = require("../helpers/validationCheckers");
const consumerDocNotFoundException_1 = require("../exceptions/missingDocumentExceptions/consumerDocNotFoundException");
const inappropriateConsumerInputException_1 = require("../exceptions/inappropriateInputExceptions/inappropriateConsumerInputException");
const customStringifiers_1 = require("../helpers/customStringifiers");
const Schema = mongoose.Schema;
exports.ConsumerSchema = new Schema({
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
exports.Consumer = mongoose.model('Consumer', exports.ConsumerSchema);
function getConsumersOrders(custId, callback) {
    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(custId)) {
        let entities = [];
        entities.push(inappropriateConsumerInputException_1.InapprConsumerInputEntities.consId);
        throw new inappropriateConsumerInputException_1.InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [custId], entities);
    }
    exports.Consumer.findById(custId).populate('orders').exec(function (err, doc) {
        if (err)
            callback(err, null);
        if (doc)
            callback(null, doc);
    });
}
exports.getConsumersOrders = getConsumersOrders;
function findConsumersBasedOnOtherInfo(otherInf, callback) {
    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(otherInf)) {
        let entities = [];
        entities.push(inappropriateConsumerInputException_1.InapprConsumerInputEntities.consOtherInfo);
        throw new inappropriateConsumerInputException_1.InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [otherInf], entities);
    }
    exports.Consumer.find({ otherInformation: { $regex: ".*" + otherInf + ".*" } }).then((doc) => {
        console.log('Consumers found based on other information');
        callback(null, doc);
    }).catch((err) => {
        console.log('Error at tyring to find Consumer!');
        callback(err, null);
    });
}
exports.findConsumersBasedOnOtherInfo = findConsumersBasedOnOtherInfo;
function addNewConsumer(consDTO, callback) {
    if (!validationCheckers_1.ValidationCheckers.isDefined(consDTO)) {
        throw new inappropriateConsumerInputException_1.InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [], []);
    }
    let consumer = new exports.Consumer();
    if (consDTO.name != '' && consDTO.name.length > 0)
        consumer.name = consDTO.name.toLowerCase();
    if (consDTO.phone != '' && consDTO.phone.length > 0)
        consumer.phone = customStringifiers_1.CustomStringifiers.removeWhitespaces(consDTO.phone);
    if (consDTO.locationsWhereOrdered.length > 0)
        consumer.locationsWhereOrdered = consDTO.locationsWhereOrdered;
    if (consDTO.orders.length > 0)
        consumer.orders = consDTO.orders;
    if (consDTO.otherInformation != '' &&
        consDTO.otherInformation.length > 0)
        consumer.otherInformation = consDTO.otherInformation;
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
exports.addNewConsumer = addNewConsumer;
// TODO: to be tested.
function setConsumerValues(conDTO, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(conDTO.name);
        console.log(conDTO.phone);
        if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(conDTO.name) && !validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(conDTO.phone)) {
            let entities = [];
            entities.push(inappropriateConsumerInputException_1.InapprConsumerInputEntities.consName);
            entities.push(inappropriateConsumerInputException_1.InapprConsumerInputEntities.consPhone);
            throw new inappropriateConsumerInputException_1.InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [conDTO.name, conDTO.phone], entities);
        }
        //console.log('We have not yet get a "MissingNameException", we are going to go to the "getCustomerId_Phone_Name" !!');
        let custId = yield getCustomerId_Phone_Name(conDTO.name, conDTO.phone);
        custId = custId.toString();
        console.log('custid');
        console.log(custId);
        console.log(typeof custId);
        //TODO: To be  tested
        if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(custId)) {
            let entities = [];
            entities.push(consumerDocNotFoundException_1.ConsumerNotFoundEntities.consName);
            entities.push(consumerDocNotFoundException_1.ConsumerNotFoundEntities.consPhone);
            throw new consumerDocNotFoundException_1.ConsumerDocNotFoundException('Could not find Consumer Doc based on the parameters!', 500, entities);
        }
        let update = conDTO.propertiesAndValues();
        //console.log('udpate: ');
        //console.log(update);
        let options = { new: true };
        // TODO: Ez a szar kurvára nem működik, itt valamit baszogatni kéne a tömbstruktúrán az udpate-nél vagy valami
        exports.Consumer.findByIdAndUpdate(custId, { $set: { update } }, options, (err, doc) => {
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
    });
}
exports.setConsumerValues = setConsumerValues;
// TODO: testing, nagyjából le van tesztelve
function getCustomerId_Phone_Name(name, phone) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Entered "getCustomerId_Phone_Name"-ba');
        /*console.log(name);
        console.log(typeof name);
        console.log(phone);
        console.log(typeof phone);*/
        let ret = null;
        // If the phone was given as the parameter.
        if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(name) && !validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(phone)) {
            let entities = [];
            entities.push(inappropriateConsumerInputException_1.InapprConsumerInputEntities.consName);
            entities.push(inappropriateConsumerInputException_1.InapprConsumerInputEntities.consPhone);
            throw new inappropriateConsumerInputException_1.InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [name, phone], entities);
        }
        if (validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(phone)) {
            console.log('Beléptünk a phone keresésbe!');
            yield exports.Consumer.findOne({ 'phone': { $regex: customStringifiers_1.CustomStringifiers.removeWhitespaces(phone) } }).then((doc) => {
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
        if (validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(name) && (ret === null)) {
            console.log('Beléptünk a name keresésbe!');
            yield exports.Consumer.findOne({ 'name': { $regex: name.toLowerCase() } }).then((doc) => {
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
    });
}
exports.getCustomerId_Phone_Name = getCustomerId_Phone_Name;
// nem kell
function getCustomerNameFromPhone(phone, callback) {
    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(phone)) {
        let entities = [];
        entities.push(inappropriateConsumerInputException_1.InapprConsumerInputEntities.consPhone);
        throw new inappropriateConsumerInputException_1.InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [phone], entities);
    }
    exports.Consumer.findOne({ 'phone': { $regex: '.*' + phone + '.*' } }).then((doc) => {
        console.log('Consumer name successfully found at "getCustomerNameFromPhone" :' + doc.name);
        callback(null, doc.name);
    }).catch((err) => {
        console.log('Error at "getCustomerNameFromPhone" :' + err);
        callback(err, null);
    });
}
exports.getCustomerNameFromPhone = getCustomerNameFromPhone;
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
function getCustomerPhoneFromName(name, callback) {
    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(name)) {
        let entities = [];
        entities.push(inappropriateConsumerInputException_1.InapprConsumerInputEntities.consName);
        throw new inappropriateConsumerInputException_1.InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [name], entities);
    }
    exports.Consumer.findOne({ 'name': { $regex: '.*' + name + '.*' } }).then((doc) => {
        console.log('Consumer ID successfully found at "getCustomerPhoneFromName" :' + doc.name);
        callback(null, doc._id);
    }).catch((err) => {
        console.log('Error at "getCustomerPhoneFromName" :' + err);
        callback(err, null);
    });
}
exports.getCustomerPhoneFromName = getCustomerPhoneFromName;
//# sourceMappingURL=consumer.js.map