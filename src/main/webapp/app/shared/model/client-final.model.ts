import { IBooking } from 'app/shared/model/booking.model';

export interface IClientFinal {
    id?: number;
    name?: string;
    surName?: string;
    mobile?: string;
    email?: string;
    numDocument?: string;
    userAppId?: number;
    bookings?: IBooking[];
}

export class ClientFinal implements IClientFinal {
    constructor(
        public id?: number,
        public name?: string,
        public surName?: string,
        public mobile?: string,
        public email?: string,
        public numDocument?: string,
        public userAppId?: number,
        public bookings?: IBooking[]
    ) {}
}
