import { Component, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { EmployeeService } from '../../services/services';
import { Employee, Modal } from '../../models/models';

@Component({
    selector: 'employee-info-component',
    templateUrl: './app/components/employee-info/employee-info.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeInfoComponent {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employeeService: EmployeeService
    ) { }    

    @Input() id: string;
    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;
    @Input() onAdd: Function;
    @Input() onUpdate: Function;
    @Input() onDelete: Function;
    
    originalEmployeeInfo: Employee;
    updatingEmployee: boolean = false;
    deletingEmployee: boolean = false;
    loadingCompanies: boolean = false;
    addingEmployee: boolean = false;
    modal: Modal = new Modal(`#${this.id}`);
    
    private addEmployee(): void {
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;

            this.employeeService.addEmployee(this.employee).then((result) => {
                this.updatingEmployee = false;
                
                if(result.success) {
                    this.onAdd(result);
                    this.operation = 0;
                    this.isFormDisabled = false;
                    this.originalEmployeeInfo = null;
                    this.modal.hide();
                    this.toast.success(result.message);
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.updatingEmployee = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.updatingEmployee = false;
            this.toast.error(e);
        }
    }

    private updateEmployee(): void {
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;

            this.employeeService.updateEmployee(this.employee).then((result) => {
                this.updatingEmployee = false;
                
                if(result.success) {
                    this.onUpdate(result);
                    this.operation = 0;
                    this.isFormDisabled = false;                 
                    this.originalEmployeeInfo = null;
                    this.modal.hide();
                    this.toast.success(result.message);
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.updatingEmployee = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.updatingEmployee = false;
            this.toast.error(e);
        }
    }

    private deleteEmployee(): void {
        try {
            this.isFormDisabled = true;
            this.deletingEmployee = true;

            this.employeeService.deleteEmployee(this.employee).then((result) => {
                this.isFormDisabled = false;
                this.deletingEmployee = false;

                if(result.success) {
                    this.onDelete(result);
                    this.modal.hide();
                    this.toast.success(result.message);
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.isFormDisabled = false;
                this.deletingEmployee = false;
                this.toast.error(error);
            });
        } catch(e) {
            this.isFormDisabled = false;
            this.deletingEmployee = false;
            this.toast.error(e);
        }
    }

    private cancelUpdate(): void {
        this.operation = 0;
        this.isFormDisabled = true;
        this.employee = JSON.parse(JSON.stringify(this.originalEmployeeInfo)) as Employee;
    }    
   
    edit(): void {
        this.operation = 1;
        this.isFormDisabled = false;
        this.originalEmployeeInfo = JSON.parse(JSON.stringify(this.employee)) as Employee;
    } 
    
    confirmAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this employee information",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.addEmployee();
                }
            }
        });
    }    

    confirmUpdate(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this employee information",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.updateEmployee();
                }
            }
        });
    }

    confirmCancelUpdate(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be reverting your changes",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.cancelUpdate();
                }
            }
        });
    }

    confirmDelete(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this employee information",
            confirmButtonText: "Delete",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteEmployee();
                }
            }
        });
    }   
}