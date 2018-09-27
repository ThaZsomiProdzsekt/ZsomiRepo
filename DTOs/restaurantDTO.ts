export class RestaurantDTO {
    restName: String;
    restLoc: String;
    restPhone: [Number];
    restEmail: String;
    restSite: String;
    additionalInformation: String;
    currentlyTakingOrders: Boolean;
    defaultHoursPerDay: {
        monday: [];
        tuesday: [];
        wednesday: [];
        thursday: [];
        friday: [];
        saturday: [];
        sunday: [];
    };
    openHoursOnHolidays: [];

    constructor(restName: String) {
        this.restName = restName;
    }
}