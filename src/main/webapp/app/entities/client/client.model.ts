import { BaseEntity } from "./../../shared";

export const enum TypeId {
    'DNI',
    'RUC'
}

export class Client implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surName?: string,
        public typeId?: TypeId,
        public numberId?: string,
        public email?: string,
        public mobile?: string,
        public address?: string,
        public contactName?: string,
        public status?: boolean,
        public dateSuscription?: any,
        public comment?: string,
        public campuses?: BaseEntity[],
    ) {
        this.status = false;
    }
}
