import { Injectable } from '@angular/core';

// user-defined models
import { Employee, Result } from '../../models/model';

// user-defined service
import { Service } from '../../shared-services/service';


@Injectable() export class EmployeeSheetService {

    constructor(private service: Service) { }

    getAll(): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "employee/getAll"
        });

    }

    add(employee: Employee): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "employee/add",
            body: employee
        });

    }

    update(employee: Employee): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "employee/update",
            body: employee
        });

    }

    delete(employee: Employee): Promise<Result> {

        return this.service.apiCall({
            verb: "post",
            uri: "employee/delete",
            body: employee
        });

    }

}