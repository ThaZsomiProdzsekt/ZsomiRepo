"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
exports.Consumer = mongoose.model('Consumer', exports.ConsumerSchema);
function addNewConsumer(consDTO, callback) {
    let consumer = new exports.Consumer();
    consumer.name = consDTO.name;
    consumer.save((err, product) => {
        if (err) {
            console.log('Error at addNewConsumer function (MODEL): ' + err);
            callback(err, null);
        }
        if (product) {
            console.log('Successful Product created at addNewConsumer function (MODEL): ' + product);
            callback(null, consumer);
        }
    });
}
exports.addNewConsumer = addNewConsumer;
//# sourceMappingURL=consumer.js.map