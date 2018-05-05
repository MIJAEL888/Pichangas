import { BaseEntity } from './../../shared';
import {Department} from "../department";

export class Province implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public departmentDto?: Department,
        public districts?: BaseEntity[],
    ) {
    }
}
