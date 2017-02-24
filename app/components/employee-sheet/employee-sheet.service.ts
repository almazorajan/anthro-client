import { Injectable } from '@angular/core';
import { Service } from '../../shared-services/service';
import { Employee, Result } from '../../models/model';

@Injectable()
export class EmployeeSheetService {

    constructor(
        private service : Service
    ) { }

    getRelationships() : string[] {
        return [
            "Father",
            "Mother",
            "Spouse",
            "Child",
            "Sibling"
        ];
    }

    getEducationalLevels() : string[] {
        return [
            "Primary",
            "Secondary",
            "Tertiary"
        ];
    }

    add(employee : Employee) : Promise<Result> {
        return this.service.apiCall({
            verb: "post",
            uri: "employee/add",
            body: employee
        });
    }
}