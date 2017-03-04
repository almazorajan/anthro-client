import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { EmployeeService } from '../../services/services';
import { Employee, Family, Modal } from '../../models/models';

@Component({
    selector: 'employee-family-component',
    templateUrl: './app/components/employee-family/employee-family.page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        EmployeeService
    ]
})

export class EmployeeFamilyComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employeeService: EmployeeService
    ) { }    
    
    @Input() id: string;
    @Input() operation: number;
    @Input() employee: Employee;
    @Input() isFormDisabled: boolean;
    
    relationships: string[];
    currentFamily: Family;
    originalFamilyInfo: Family;

    ngOnInit() {
        this.getRelationships();
    }

    private getRelationships() {
        this.relationships = this.employeeService.getRelationships();
    }

    viewFamilyInfo(family: Family) {
        this.currentFamily = family;
    }

    editFamilyInfo(): void {
        this.originalFamilyInfo = JSON.parse(JSON.stringify(this.currentFamily)) as Family;
    }
    
    addFamily(): void {
        if (!this.employee.family) {
            this.employee.family = [];
        }
        this.employee.family.unshift(new Family());
    }

    confirmDelete(family: Family): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this family information",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteFamily(family);
                }
            }
        });
    }    
    
    private deleteFamily(family: Family): void {
        let index = this.employee.family.indexOf(family);
        this.employee.family.splice(index, 1);
    }
}
