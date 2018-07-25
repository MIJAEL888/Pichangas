import { ISchedule } from 'app/shared/model/schedule.model';
import { IBooking } from 'app/shared/model/booking.model';

export const enum TypeField {
    GRASS = 'GRASS',
    CONCRET = 'CONCRET'
}

export const enum TypeSport {
    FUTBOL = 'FUTBOL',
    VOLLEYBALL = 'VOLLEYBALL',
    BASKETBALL = 'BASKETBALL'
}

export const enum StateField {
    MAINTENANCE = 'MAINTENANCE',
    AVAILABLE = 'AVAILABLE',
    LOCKED = 'LOCKED'
}

export interface IField {
    id?: number;
    name?: string;
    description?: string;
    comment?: string;
    numPlayers?: number;
    typeField?: TypeField;
    typeSport?: TypeSport;
    state?: StateField;
    campusId?: number;
    schedules?: ISchedule[];
    bookings?: IBooking[];
}

export class Field implements IField {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public comment?: string,
        public numPlayers?: number,
        public typeField?: TypeField,
        public typeSport?: TypeSport,
        public state?: StateField,
        public campusId?: number,
        public schedules?: ISchedule[],
        public bookings?: IBooking[]
    ) {}
}
