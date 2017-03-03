
import { EmploymentStatus } from './models';

export class WorkHistory {
    
    constructor() {
        this.position = "";
        this.companyName = "";
        this.dateFrom = new Date();
        this.dateTo = new Date();
        this.isPresent = false;
        this.employmentStatus = new EmploymentStatus();
        this.salary = 0;
        this.reasonForLeaving = "";
    }

    position : string;
    companyName : string;
    dateFrom : Date;
    dateTo : Date;
    isPresent : boolean;
    employmentStatus : EmploymentStatus;
    salary : number;
    reasonForLeaving : string;
}