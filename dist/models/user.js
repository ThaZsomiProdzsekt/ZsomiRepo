"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: {
        type: String,
        required: false,
        default: 'newUser'
    },
    firstName: {
        type: String,
        required: false,
        default: 'Doe'
    },
    lastName: {
        type: String,
        required: false,
        default: 'John'
    },
    email: {
        type: String,
        required: false,
        default: 'asd@asd.asd'
    },
    phone: {
        type: Number,
        required: false,
        default: 0
    },
    additionalInformation: {
        type: String,
        required: false,
        default: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.User = mongoose.model('User', UserSchema);
function addNewUser(userDto, callback) {
    let user = new exports.User();
    user.userName = userDto.userName;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.phone = userDto.phone;
    user.save((err, product) => {
        if (err) {
            console.log('Error at adding new User: ' + err);
            callback(err);
        }
    });
}
exports.addNewUser = addNewUser;
//# sourceMappingURL=user.js.map