import { BaseEntity } from './../../shared';

export class Province implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public departmentId?: number,
        public districts?: BaseEntity[],
    ) {
    }
}
