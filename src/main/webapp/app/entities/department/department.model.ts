import { BaseEntity } from "./../../shared";

export class Department implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public provinces?: BaseEntity[],
    ) {
    }
}
