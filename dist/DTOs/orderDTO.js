"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderDTO {
    constructor(consumerName) {
        this._consumerName = consumerName;
    }
    get orderDate() {
        return this._orderDate;
    }
    get orderMeal() {
        return this._orderMeal;
    }
    get orderDrink() {
        return this._orderDrink;
    }
    get orderDiscounted() {
        return this._orderDiscounted;
    }
    get consumerName() {
        return this._consumerName;
    }
    get consumerAddress() {
        return this._consumerAddress;
    }
    get consumerPhone() {
        return this._consumerPhone;
    }
    get orderFromWeb() {
        return this._orderFromWeb;
    }
    get orderFromPhone() {
        return this._orderFromPhone;
    }
    get orderPersonally() {
        return this._orderPersonally;
    }
    get tableReservations() {
        return this._tableReservations;
    }
}
exports.OrderDTO = OrderDTO;
//# sourceMappingURL=orderDTO.js.map