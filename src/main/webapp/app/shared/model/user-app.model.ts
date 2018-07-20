import { Moment } from 'moment';
import { ICampus } from 'app/shared/model/campus.model';

export interface IUserApp {
    id?: number;
    username?: string;
    password?: string;
    dateReg?: Moment;
    faccebookId?: string;
    googleId?: string;
    clientFinalId?: number;
    campuses?: ICampus[];
}

export class UserApp implements IUserApp {
    constructor(
        public id?: number,
        public username?: string,
        public password?: string,
        public dateReg?: Moment,
        public faccebookId?: string,
        public googleId?: string,
        public clientFinalId?: number,
        public campuses?: ICampus[]
    ) {}
}
