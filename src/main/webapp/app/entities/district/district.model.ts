import { BaseEntity } from "./../../shared";
import {Province} from "../province";

export class District implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public campuses?: BaseEntity[],
        public provinceDto?: Province,
    ) {
    }
}
