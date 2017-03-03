import { Injectable } from '@angular/core';
import { EmploymentStatus, Result } from '../models/model';
import { ProviderService } from './provider.service';

@Injectable() 
export class EmploymentStatusService extends ProviderService {

    getAll(): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employmentstatus/getall"
        });
    }

    addEmploymentStatus(employmentStatus: EmploymentStatus): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employmentstatus/add",
            body: employmentStatus
        });
    }

    updateEmploymentStatus(employmentStatus: EmploymentStatus): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employmentstatus/update",
            body: employmentStatus
        });
    }

    deletEmploymentStatus(employmentStatus: EmploymentStatus): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employmentstatus/delete",
            body: employmentStatus
        });
    }
}