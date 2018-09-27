import * as mongoose from 'mongoose';
import {usersDTO} from "../DTOs/usersDTO";

const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
    userName: String;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    additionalInformation: String;
    createdDate: Date;
}

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

export const User = mongoose.model<IUser>('User', UserSchema);

export function addNewUser(userDto: usersDTO, callback: Function) {
    let user = new User();
    user.userName = userDto.userName;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.phone = userDto.phone;

    user.save( (err, product) => {
        if (err) {
            console.log('Error at adding new User: ' + err);
            callback(err);
        }
    });
}