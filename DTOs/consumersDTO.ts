export class ConsumersDTO {
    public name: String;
    public phone: String;
    public locationsWhereOrdered: String[];
    public orders: any[];
    public tableBookings: Number;
    public otherInformation: String;
    public created_date: Date;

    constructor(name: String) {
        this.name = name;
    }
}