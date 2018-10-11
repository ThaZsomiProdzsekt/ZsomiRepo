export class OrderDTO {
    private _orderDate: Date;
    private _orderMeal: any[];
    private _orderDrink: any[];
    private _orderDiscounted: any[];
    private _consumerName: string;
    private _consumerAddress: string;
    private _consumerPhone: string;
    private _orderFromWeb: boolean;
    private _orderFromPhone: boolean;
    private _orderPersonally: boolean;
    private _tableReservations: number;

    constructor(consumerName: string) {
        this._consumerName = consumerName;
    }


    get orderDate(): Date {
        return this._orderDate;
    }

    get orderMeal(): any[] {
        return this._orderMeal;
    }

    get orderDrink(): any[] {
        return this._orderDrink;
    }

    get orderDiscounted(): any[] {
        return this._orderDiscounted;
    }

    get consumerName(): string {
        return this._consumerName;
    }

    get consumerAddress(): string {
        return this._consumerAddress;
    }

    get consumerPhone(): string {
        return this._consumerPhone;
    }

    get orderFromWeb(): boolean {
        return this._orderFromWeb;
    }

    get orderFromPhone(): boolean {
        return this._orderFromPhone;
    }

    get orderPersonally(): boolean {
        return this._orderPersonally;
    }

    get tableReservations(): number {
        return this._tableReservations;
    }
}