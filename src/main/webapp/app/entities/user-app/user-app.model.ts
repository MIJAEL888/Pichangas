import { BaseEntity } from "./../../shared";

export class UserApp implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public password?: string,
        public dateReg?: any,
        public faccebookId?: string,
        public googleId?: string,
        public clientFinalId?: number,
        public campuses?: BaseEntity[],
    ) {
    }
}
