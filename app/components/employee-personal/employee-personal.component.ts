import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Modal } from '../../models/models';

@Component({
    selector: 'employee-personal-component',
    templateUrl: './app/components/employee-personal/employee-personal.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeePersonalComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    parseDate(dateString: string): Date {
        if(dateString) {
            return new Date(dateString);
        }
        return null;
    }    

    computeAge(employee: Employee): void {
        try {
            var birthDate = new Date(employee.birthDate);
            var birthDay = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDay());
            var diff = Date.now() - birthDay.getTime();
            this.employee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);    
        } catch(e) {
            this.toast.error(e);
        }
    }
}
