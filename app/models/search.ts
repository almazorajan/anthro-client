
export class Search {

    field: string;
    keyword: string;
    dateFrom: Date;
    dateTo: Date;

    constructor() {

        this.field = "";
        this.keyword = "";
        this.dateFrom = new Date();
        this.dateTo = new Date();

    }

}