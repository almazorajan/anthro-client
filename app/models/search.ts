export class Search {

    constructor() {
        this.field = "";
        this.keyword = "";
        this.dateFrom = new Date();
        this.dateTo = new Date();
    }

    field: string;
    keyword: string;
    dateFrom: Date;
    dateTo: Date;
}