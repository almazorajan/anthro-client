import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Modal } from '../../models/models';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

@Component({
    selector: 'employee-personal-component',
    templateUrl: './app/components/employee-personal/employee-personal.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeePersonalComponent implements OnInit, OnChanges {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper) {
    }

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    birthDate: any = {
        date: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
        }
    };    

    ngOnChanges() {
        if (this.employee) {
            if (this.employee.birthDate) {
                var date = new Date(this.employee.birthDate);

                this.birthDate = {
                    date: {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate()
                    }
                };
            }
        }
    }    

    ngOnInit() { }

    parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        }
        return null;
    }

    computeAge(): void {
        try {
            var birthDate = new Date(this.employee.birthDate);
            var birthDay = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDay());
            var diff = Date.now() - birthDay.getTime();
            this.employee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
        } catch (e) {
            this.toast.error(e);
        }
    }
}
