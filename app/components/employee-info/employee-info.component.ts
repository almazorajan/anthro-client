import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { EmployeeService } from '../../services/services';
import { Employee, Modal, EmployeeInfoTab, Tab } from '../../models/models';

@Component({
    selector: 'employee-info-component',
    templateUrl: './app/components/employee-info/employee-info.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeInfoComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employeeService: EmployeeService
    ) { }    

    @Input() id: string;
    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;
    @Output() onAdd: EventEmitter<any> = new EventEmitter();
    @Output() onUpdate: EventEmitter<any> = new EventEmitter();
    @Output() onDelete: EventEmitter<any> = new EventEmitter();
    
    tabKeys: any[];
    originalEmployeeInfo: Employee;
    updatingEmployee: boolean = false;
    deletingEmployee: boolean = false;
    loadingCompanies: boolean = false;
    addingEmployee: boolean = false;
    modal: Modal = new Modal(`#${this.id}`);
    tabs: EmployeeInfoTab = {
        personal: new Tab({
            name: "Per",
            href: "#personal",
            active: true,
            badge: 0
        }),
        employment: new Tab({
            name: "Emp",
            href: "#employment",
            active: false,
            badge: 0
        }),
        contacts: new Tab({
            name: "Con",
            href: "#contacts",
            active: false,
            badge: 0
        }),
        address: new Tab({
            name: "Addr",
            href: "#address",
            active: false,
            badge: 0
        }),
        government: new Tab({
            name: "Gov",
            href: "#government",
            active: false,
            badge: 0
        }),
        family: new Tab({
            name: "Fam",
            href: "#family",
            active: false,
            badge: 0
        }),
        education: new Tab({
            name: "Edu",
            href: "#education",
            active: false,
            badge: 0
        }),
        work: new Tab({
            name: "Work",
            href: "#work",
            active: false,
            badge: 0
        }),
        accreditation: new Tab({
            name: "Accr",
            href: "#accreditations",
            active: false,
            badge: 0
        })
    }
    
    ngOnInit() {
        this.tabKeys = Object.keys(this.tabs);

    }

    private resetTabBadges(): void {
        this.tabs.personal.badge = 0;
        this.tabs.employment.badge = 0;
        this.tabs.contacts.badge = 0;
        this.tabs.address.badge = 0;
        this.tabs.government.badge = 0;
        this.tabs.family.badge = 0;
        this.tabs.education.badge = 0;
        this.tabs.work.badge = 0;
        this.tabs.accreditation.badge = 0;
    }    

    private addEmployee(): void {
        try {
            this.isFormDisabled = true;
            this.updatingEmployee = true;

            this.employeeService.addEmployee(this.employee).then((result) => {
                this.updatingEmployee = false;
                this.isFormDisabled = false;
                    
                if(result.success) {
                    this.onAdd.emit();
                    this.operation = 0;
                    this.originalEmployeeInfo = null;
                    this.modal.hide();
                    this.toast.success(result.message);
                } else {
                    this.toast.error(result.message);
                }
            })
            .catch((error) => {
                this.updatingEmployee = false;
                this.isFormDisabled = false;
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
                this.isFormDisabled = false;                 
                    
                if(result.success) {
                    this.onUpdate.emit();
                    this.operation = 0;
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
                    this.onDelete.emit();
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
        this.employee = JSON.parse(JSON.stringify(this.employee)) as Employee;
        this.originalEmployeeInfo = JSON.parse(JSON.stringify(this.employee)) as Employee;
    } 
    
    confirmAdd(): void {
        let valid = this.validate();

        if (!valid) {
            return;
        }        

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

    private superTrim(str: string): string {
        try {
            return str.replace(/\s+/g, "").trim();
        } catch (e) {
            console.log(e);
        }
        return "";
    }    

    validate(): boolean {
        this.resetTabBadges();
        let isValid = true;

        if (!this.superTrim(this.employee.firstName)) {
            this.toast.info("Please provide a first name to proceed");
            this.tabs.personal.badge += 1;
            isValid = false;
        }

        if (!this.superTrim(this.employee.lastName)) {
            this.toast.info("Please provide a last name to proceed");
            this.tabs.personal.badge += 1;
            isValid = false;
        }

        if (!this.superTrim(this.employee.employeeNumber)) {
            this.toast.info("Please provide an employee number");
            this.tabs.employment.badge += 1;
            isValid = false;
        }

        if (!this.employee.position || !this.superTrim(this.employee.position._id)) {
            this.toast.info("Please select a position");
            this.tabs.employment.badge += 1;
            isValid = false;
        }

        if (!this.employee.company || !this.superTrim(this.employee.company._id)) {
            this.toast.info("Please select a company");
            this.tabs.employment.badge += 1;
            isValid = false;
        }        
        
        if (!this.employee.employmentStatus || !this.superTrim(this.employee.employmentStatus._id)) {
            this.toast.info("Please select an employment status");
            this.tabs.employment.badge += 1;
            isValid = false;
        }

        if (this.employee.phoneNumbers.length <= 0 && this.employee.landlines.length <= 0) {
            this.toast.info("Please provide at least one contact information");
            this.tabs.contacts.badge += 1;
            isValid = false;
        }

        return isValid;
    }
}