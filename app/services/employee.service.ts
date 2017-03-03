import { Injectable } from '@angular/core';
import { Search, Employee, Result } from '../models/models';
import { ProviderService } from './provider.service';

@Injectable() export class EmployeeService extends ProviderService {

    getRelationships(): string[] {
        return [
            "Father",
            "Mother",
            "Spouse",
            "Child",
            "Sibling"
        ];
    }

    getEducationalLevels(): string[] {
        return [
            "Primary",
            "Secondary",
            "Tertiary"
        ];
    }

    addEmployee(employee: Employee): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employee/add",
            body: employee
        });
    }    

    getAllEmployees(): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employee/getall"
        });
    }

    updateEmployee(employee: Employee): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employee/update",
            body: employee 
        });
    }

    deleteEmployee(employee: Employee): Promise<Result> {
        return this.apiCall({
            verb: "post",
            uri: "employee/delete",
            body: employee 
        });
    }
}