"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tableBooking_1 = require("../models/tableBooking");
const tablesDTO_1 = require("../DTOs/tablesDTO");
const consumer_1 = require("../models/consumer");
const consumersDTO_1 = require("../DTOs/consumersDTO");
const restaurantDTO_1 = require("../DTOs/restaurantDTO");
const restaurant_1 = require("../models/restaurant");
class TableBookingRoutes {
    tableBookingRoutes(app) {
        // NEW DRINK
        app.route('/newTableBooking').get((req, res) => {
            var consumer;
            var cons = new consumersDTO_1.ConsumersDTO('Mr. Im gonna fucking kill you');
            consumer_1.addNewConsumer(cons, (err, result) => {
                if (err)
                    console.log('Error at creating new Consumer (OUTSIDE): ' + err);
                if (result) {
                    console.log('Successful Result document at creating new Consumer (OUTSIDE): ' + result);
                    consumer = result;
                    console.log('consumer változó értéke: ' + consumer);
                    let rest;
                    let restDTO = new restaurantDTO_1.RestaurantDTO('bitch you just jealous at my swagga');
                    restaurant_1.addNewRestaurant(restDTO, function (err, result) {
                        if (err)
                            console.log('Error at addNewRestaurant (OUTSIDE): ' + err);
                        if (result) {
                            console.log('Successful Result document at addNewRestaurant (OUTSIDE): ' + result);
                            rest = result;
                            console.log('rest változó értéke: ' + rest);
                            var table = new tablesDTO_1.tableDTO('dummyID', 4, true, 'anyád picsájába', true, [{ reservedFrom: new Date(), reservedTo: new Date(), reservedFor: consumer },
                                { reservedFrom: new Date(), reservedTo: new Date(), reservedFor: consumer }]);
                            tableBooking_1.createNewTableBooking(rest, table, 3, 5, 'AVAIL', function (err, prod) {
                                if (err)
                                    console.log('Error at createNewTableBooking (OUTSIDE): ' + err);
                                if (prod) {
                                    console.log('Successful Result documentation at createNewTableBooking (OUTSIDE): ' + prod);
                                    res.json(prod);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}
exports.TableBookingRoutes = TableBookingRoutes;
//# sourceMappingURL=tableBookingRoutes.js.map