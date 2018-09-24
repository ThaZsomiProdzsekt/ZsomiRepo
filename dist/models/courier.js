"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const order_1 = require("./order");
const Schema = mongoose.Schema;
// megbasszák a kurva anyádat
const Order = mongoose.model('Order', order_1.OrderSchema);
exports.CourierSchema = new Schema({});
//# sourceMappingURL=courier.js.map