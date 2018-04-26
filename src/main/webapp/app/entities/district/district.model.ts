import { BaseEntity } from './../../shared';

export class District implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public campuses?: BaseEntity[],
        public provinceId?: number,
    ) {
    }
}
