import { IDistrict } from 'app/shared/model/district.model';

export interface IProvince {
    id?: number;
    name?: string;
    code?: string;
    departmentId?: number;
    districts?: IDistrict[];
}

export class Province implements IProvince {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public departmentId?: number,
        public districts?: IDistrict[]
    ) {}
}
