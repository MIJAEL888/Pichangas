import { BaseEntity } from './../../shared';

export const enum StateBook {
    'FREE',
    'BOOKED',
    'CONFIRMED',
    'LOCKED'
}

export class Booking implements BaseEntity {
    constructor(
        public id?: number,
        public state?: StateBook,
        public dateReg?: any,
        public date?: any,
        public startHour?: number,
        public endHour?: number,
        public fieldId?: number,
        public scheduleId?: number,
        public clientFinalId?: number,
    ) {
    }
}