import { IField } from 'app/shared/model/field.model';
import { IUserApp } from 'app/shared/model/user-app.model';

export interface ICampus {
    id?: number;
    name?: string;
    description?: string;
    comment?: string;
    openTime?: number;
    closeTime?: number;
    aditional?: string;
    addresss?: string;
    reference?: string;
    latitude?: number;
    longitude?: number;
    codPostal?: string;
    status?: boolean;
    rating?: string;
    clientId?: number;
    fields?: IField[];
    userapps?: IUserApp[];
    districtId?: number;
}

export class Campus implements ICampus {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public comment?: string,
        public openTime?: number,
        public closeTime?: number,
        public aditional?: string,
        public addresss?: string,
        public reference?: string,
        public latitude?: number,
        public longitude?: number,
        public codPostal?: string,
        public status?: boolean,
        public rating?: string,
        public clientId?: number,
        public fields?: IField[],
        public userapps?: IUserApp[],
        public districtId?: number
    ) {
        this.status = false;
    }
}
