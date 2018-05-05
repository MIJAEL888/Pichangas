import { BaseEntity } from './../../shared';
import {Client} from "../client";

export class Campus implements BaseEntity {
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
        public clientDto?: Client,
        public fields?: BaseEntity[],
        public userapps?: BaseEntity[],
        public districtId?: number,
    ) {
        this.status = false;
    }
}
