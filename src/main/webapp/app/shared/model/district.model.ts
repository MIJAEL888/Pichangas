import { ICampus } from 'app/shared/model/campus.model';

export interface IDistrict {
    id?: number;
    name?: string;
    code?: string;
    campuses?: ICampus[];
    provinceId?: number;
}

export class District implements IDistrict {
    constructor(public id?: number, public name?: string, public code?: string, public campuses?: ICampus[], public provinceId?: number) {}
}
