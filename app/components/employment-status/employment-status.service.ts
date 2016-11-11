/*
version: 1
Employment Status Service
**/

// @angular
import { Injectable } from '@angular/core';

// user-defined models
import { EmploymentStatus, Result } from '../../models/model';

// user-defined service
import { Service } from '../../shared-services/service';

@Injectable() export class EmploymentStatusService {

    constructor(private service: Service) {}

    getAll(): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "employmentstatus/getall"
        });

    }

    addEmploymentStatus(employmentStatus: EmploymentStatus): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "employmentstatus/add",
            body: employmentStatus
        });

    }

    updateEmploymentStatus(employmentStatus: EmploymentStatus): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "employmentstatus/update",
            body: employmentStatus
        });

    }

    deletEmploymentStatus(employmentStatus: EmploymentStatus): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "employmentstatus/delete",
            body: employmentStatus
        });

    }

}