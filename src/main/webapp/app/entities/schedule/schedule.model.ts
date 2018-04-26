import { BaseEntity } from './../../shared';

export const enum DaysOfWeek {
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
}

export class Schedule implements BaseEntity {
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
        public fieldId?: number,
        public bookings?: BaseEntity[],
    ) {
    }
}
