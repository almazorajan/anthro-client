import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

export class EmployeePersonalComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper) {
    }

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    ngOnInit() {
    }

    set birthDate(e) {
        try {
            let f: any = e.split('-');
            let d = new Date(Date.UTC(f[0], f[1] - 1, f[2]));
            this.employee.birthDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
        } catch (e) {
            console.log(e);
        }
    }

    get birthDate() {
        let def = new Date().toISOString().substring(0, 10);

        try {
            if (!this.employee) {
                return def; 
            }

            if (!typeof this.employee.birthDate) {
                return def;
            }

            this.employee.birthDate = new Date(this.employee.birthDate);
            return this.employee.birthDate.toISOString().substring(0, 10);
        } catch (e) {
            console.log(e);
}
        
        return def;
    }

    parseDate(dateString: string): Date {
        if (dateString) {
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
        } catch (e) {
            this.toast.error(e);
        }
    }
}
