import { Moment } from 'moment';

export const enum StateBook {
    FREE = 'FREE',
    BOOKED = 'BOOKED',
    CONFIRMED = 'CONFIRMED',
    LOCKED = 'LOCKED'
}

export interface IBooking {
    id?: number;
    state?: StateBook;
    dateReg?: Moment;
    date?: Moment;
    startHour?: number;
    endHour?: number;
    text?: string;
    startDate?: Moment;
    endDate?: Moment;
    allDay?: boolean;
    description?: string;
    fieldId?: number;
    scheduleId?: number;
    clientFinalId?: number;
}

export class Booking implements IBooking {
    constructor(
        public id?: number,
        public state?: StateBook,
        public dateReg?: Moment,
        public date?: Moment,
        public startHour?: number,
        public endHour?: number,
        public text?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public allDay?: boolean,
        public description?: string,
        public fieldId?: number,
        public scheduleId?: number,
        public clientFinalId?: number
    ) {
        this.allDay = false;
    }
}
