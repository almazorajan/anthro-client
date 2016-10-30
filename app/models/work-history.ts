
import { EmploymentStatus } from './Employment-status';
import { Company } from './company';

export class WorkHistory {

    position: string;
    company: Company;
    dateFrom: Date;
    dateTo: Date;
    isPresent: boolean;
    employmentStatus: EmploymentStatus;
    salary: number;
    reasonForLeaving: string;

}