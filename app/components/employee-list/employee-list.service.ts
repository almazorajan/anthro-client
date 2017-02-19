import { Injectable } from '@angular/core';
import { Search, Employee, Result } from '../../models/model';
import { Service } from '../../shared-services/service';

@Injectable() export class EmployeeListService extends Service {

    getAllEmployees() : Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employeelist/getall"
        });
    }

    updateEmployee(employee : Employee) : Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employeelist/update",
            body: employee 
        });
    }

    deleteEmployee(employee : Employee) : Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employeelist/delete",
            body: employee 
        });
    }
}