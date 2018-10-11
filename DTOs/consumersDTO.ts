import { ValidationCheckers } from "../helpers/validationCheckers";

export class ConsumersDTO {
    private _name: string;
    private _phone: string;
    private _locationsWhereOrdered: string[];
    private _orders: any[];
    private _tableBookings: number;
    private _otherInformation: string;


    constructor(name?: string, phone?: string, locationsWhereOrdered?: string[], orders?: any[], tableBookings?: number,
                otherInformation?: string) {
        this._name = name;
        this._phone = phone;
        this._locationsWhereOrdered = locationsWhereOrdered;
        this._orders = orders;
        this._tableBookings = tableBookings;
        this._otherInformation = otherInformation;
        this.muddhole();
    }

    private muddhole() {
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

    public getDefinedPropertiesAsObject(): Object[] {
        let ret: Object[] = [];

        return ret;
    }


    get name(): string {
        return this._name;
    }

    get phone(): string {
        return this._phone;
    }

    get locationsWhereOrdered(): string[] {
        return this._locationsWhereOrdered;
    }

    get orders(): any[] {
        return this._orders;
    }

    get tableBookings(): number {
        return this._tableBookings;
    }

    get otherInformation(): string {
        return this._otherInformation;
    }

    //TODO: Tedd át ezt egy Helper osztályba, csak faszomnak sincs kedve gettereket hivogatni :(
    public propertiesAndValues(): Object[] {
        let ret:Object[] = [];

        if (ValidationCheckers.stringExistsAndNotEmpty(this._name))
            ret['name'] = this._name;
        if (ValidationCheckers.stringExistsAndNotEmpty(this._phone))
            ret['phone'] = this._phone;
        if (ValidationCheckers.typedArrayExistsAndNotEmpty(this._locationsWhereOrdered, "string"))
            ret['locationsWhereOrdered'] = this._locationsWhereOrdered;
        if (ValidationCheckers.isDefined(this._orders) && this._orders.length > 0)
            ret['orders'] = this._orders;
        if (ValidationCheckers.numberExistsAndNotNull(this._tableBookings))
            ret['tableBookings'] = this._tableBookings;
        if (ValidationCheckers.stringExistsAndNotEmpty(this._otherInformation))
            ret['otherInformation'] = this._otherInformation;

        return ret;
    }
}
