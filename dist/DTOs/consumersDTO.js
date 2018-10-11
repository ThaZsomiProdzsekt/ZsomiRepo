"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationCheckers_1 = require("../helpers/validationCheckers");
class ConsumersDTO {
    constructor(name, phone, locationsWhereOrdered, orders, tableBookings, otherInformation) {
        this._name = name;
        this._phone = phone;
        this._locationsWhereOrdered = locationsWhereOrdered;
        this._orders = orders;
        this._tableBookings = tableBookings;
        this._otherInformation = otherInformation;
        this.muddhole();
    }
    muddhole() {
        console.log('name:');
        console.log(this._name);
        console.log('phone:');
        console.log(this._phone);
        console.log('locationswhereordered:');
        console.log(this._locationsWhereOrdered);
        console.log('orders:');
        console.log(this._orders);
        console.log('tablebookings:');
        console.log(this._tableBookings);
        console.log('otherinfo:');
        console.log(this._otherInformation);
    }
    getDefinedPropertiesAsObject() {
        let ret = [];
        return ret;
    }
    get name() {
        return this._name;
    }
    get phone() {
        return this._phone;
    }
    get locationsWhereOrdered() {
        return this._locationsWhereOrdered;
    }
    get orders() {
        return this._orders;
    }
    get tableBookings() {
        return this._tableBookings;
    }
    get otherInformation() {
        return this._otherInformation;
    }
    //TODO: Tedd át ezt egy Helper osztályba, csak faszomnak sincs kedve gettereket hivogatni :(
    propertiesAndValues() {
        let ret = [];
        if (validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(this._name))
            ret['name'] = this._name;
        if (validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(this._phone))
            ret['phone'] = this._phone;
        if (validationCheckers_1.ValidationCheckers.typedArrayExistsAndNotEmpty(this._locationsWhereOrdered, "string"))
            ret['locationsWhereOrdered'] = this._locationsWhereOrdered;
        if (validationCheckers_1.ValidationCheckers.isDefined(this._orders) && this._orders.length > 0)
            ret['orders'] = this._orders;
        if (validationCheckers_1.ValidationCheckers.numberExistsAndNotNull(this._tableBookings))
            ret['tableBookings'] = this._tableBookings;
        if (validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(this._otherInformation))
            ret['otherInformation'] = this._otherInformation;
        return ret;
    }
}
exports.ConsumersDTO = ConsumersDTO;
//# sourceMappingURL=consumersDTO.js.map