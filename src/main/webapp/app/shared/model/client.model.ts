import { Moment } from 'moment';
import { ICampus } from 'app/shared/model/campus.model';

export const enum TypeId {
    DNI = 'DNI',
    RUC = 'RUC'
}

export interface IClient {
    id?: number;
    name?: string;
    surName?: string;
    typeId?: TypeId;
    numberId?: string;
    email?: string;
    mobile?: string;
    address?: string;
    contactName?: string;
    status?: boolean;
    dateSuscription?: Moment;
    comment?: string;
    campuses?: ICampus[];
}

export class Client implements IClient {
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
        public dateSuscription?: Moment,
        public comment?: string,
        public campuses?: ICampus[]
    ) {
        this.status = false;
    }
}
