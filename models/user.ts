import * as mongoose from 'mongoose';

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

export const User = mongoose.model<IUser>('User', UserSchema);