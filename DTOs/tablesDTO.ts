// SPIRAL DEATH BEAM, TACO TUESDAY
import { IConsumer, Consumer, ConsumerSchema } from "../models/consumer";

export class tableDTO {
    public tableID: String;
    public numberOfChairs: Number;
    public reserved: Boolean;
    public location: String;
    public inDoors: Boolean;
    public reservations: { reservedFrom: Date, reservedTo: Date, reservedFor: any }[];

    // FOR THE LOVE OF GOD
    constructor(tableID: String, numberOfChairs: Number, reserved: Boolean, location: String,
                inDoors: Boolean, reservations: { reservedFrom: Date; reservedTo: Date, reservedFor: any }[]) {
        // STOP FISTING ME!!!! SHORYUKEN!
        this.tableID = tableID;
        this.numberOfChairs = numberOfChairs;
        this.reserved = reserved;
        this.location = location;
        this.inDoors = inDoors;
        this.reservations = reservations;
    }
}