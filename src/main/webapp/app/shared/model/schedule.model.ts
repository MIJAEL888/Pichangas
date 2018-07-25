import { Moment } from 'moment';
import { IBooking } from 'app/shared/model/booking.model';

export const enum DaysOfWeek {
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY'
}

export interface ISchedule {
    id?: number;
    dayOfWeek?: number;
    nameDayOfWeek?: string;
    enumDayOfWeek?: DaysOfWeek;
    startHour?: number;
    endHour?: number;
    cost?: number;
    price?: number;
    rate?: number;
    text?: string;
    startDate?: Moment;
    endDate?: Moment;
    allDay?: boolean;
    fieldId?: number;
    bookings?: IBooking[];
}

export class Schedule implements ISchedule {
    constructor(
        public id?: number,
        public dayOfWeek?: number,
        public nameDayOfWeek?: string,
        public enumDayOfWeek?: DaysOfWeek,
        public startHour?: number,
        public endHour?: number,
        public cost?: number,
        public price?: number,
        public rate?: number,
        public text?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public allDay?: boolean,
        public fieldId?: number,
        public bookings?: IBooking[]
    ) {
        this.allDay = false;
    }
}
