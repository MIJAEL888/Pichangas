import { IProvince } from 'app/shared/model/province.model';

export interface IDepartment {
    id?: number;
    name?: string;
    code?: string;
    provinces?: IProvince[];
}

export class Department implements IDepartment {
    constructor(public id?: number, public name?: string, public code?: string, public provinces?: IProvince[]) {}
}
