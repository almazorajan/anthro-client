import { Component, OnInit } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { EmployeeService, CompanyService, EmploymentStatusService, PositionService } from '../../services/services';
import { EmploymentStatus, Employee, Position, Company, Family, Education, Accreditation, WorkHistory, Modal, Address } from '../../models/models';

@Component({
    selector: 'employee-list-component',
    templateUrl: './app/components/employee-list/employee-list.page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        EmployeeService,
        CompanyService,
        EmploymentStatusService,
        PositionService,
    ]
})

export class EmployeeListComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employeeService: EmployeeService,
        private companyService: CompanyService,
        private employmentStatusService: EmploymentStatusService,
        private positionService: PositionService
    ) { }

    operation: number = 0;
    originalEmployeeInfo: Employee;
    currentEmployee: Employee;
    searchFilter: string = "";
    updatingEmployee: boolean = false;
    deletingEmployee: boolean = false;
    loadingEmployees: boolean = false;
    isFormDisabled: boolean = true;
    addingEmployee: boolean = false;
    employees: Employee[] = [];
    modal: Modal = new Modal("#mdlModalInfo");;

    ngOnInit() {
        this.getAllEmployees();
    }

    private getAllEmployees(): void {
        try {
            this.employees = [];
            this.loadingEmployees = true;
            this.isFormDisabled = true;

            this.employeeService.getAllEmployees().then((result) => {
                this.loadingEmployees = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.employees = result.data as Employee[];
                } else {
                    toastr.error(result.message);
                }
            })
            .catch((err) => {
                this.loadingEmployees = false;
                this.isFormDisabled = false;
                toastr.error(err);
            });
        } catch (e) {
            this.loadingEmployees = false;
            this.isFormDisabled = false;
            toastr.error(e);
        }
    }

    view(employee: Employee): void {
        this.currentEmployee = employee;
        this.isFormDisabled = true;
        this.operation = 0;
        this.modal.show();
    }
   
    add(): void {
        this.currentEmployee = new Employee();
        this.isFormDisabled = false;
        this.operation = 2;
        this.modal.show();
    }
}