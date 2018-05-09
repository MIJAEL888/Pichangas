import { BaseEntity } from "./../../shared";

export class ClientFinal implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surName?: string,
        public mobile?: string,
        public email?: string,
        public numDocument?: string,
        public userAppId?: number,
        public bookings?: BaseEntity[],
    ) {
    }
}
