export class HomeModel {
    constructor(
        public clientId?: number,
        public campusId?: number,
        public fieldId?: number
    ) {
        this.clientId = null;
        this.campusId = null;
        this.fieldId = null;
    }
}
