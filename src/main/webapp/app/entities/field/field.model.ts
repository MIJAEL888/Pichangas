import { BaseEntity } from './../../shared';

export const enum TypeField {
    'GRASS',
    'CONCRET'
}

export const enum TypeSport {
    'FUTBOL',
    'VOLLEYBALL',
    'BASKETBALL'
}

export const enum StateField {
    'MAINTENANCE',
    'AVAILABLE',
    'LOCKED'
}

export class Field implements BaseEntity {
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
        public schedules?: BaseEntity[],
        public bookings?: BaseEntity[],
    ) {
    }
}
