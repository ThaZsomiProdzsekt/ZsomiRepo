import * as mongoose from 'mongoose';
import { tableDTO } from '../DTOs/tablesDTO';
import { IConsumer, Consumer, ConsumerSchema } from "../models/consumer";
import * as tableBooking from '../models/tableBooking';
import { TableBooking, TableBookingSchema, changeTableReservation } from "../models/tableBooking";

//changeTableReservation()