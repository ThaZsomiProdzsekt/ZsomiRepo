"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    additionalInformation: {
        type: String,
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.User = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map