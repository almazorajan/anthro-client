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
    loadingCompanies: boolean = false;
    loadingEmploymentStatuses: boolean = false;
    loadingPositions: boolean = false;
    isFormDisabled: boolean = true;
    readyToSave: boolean = false;
    addingEmployee: boolean = false;
    employees: Employee[] = [];
    companies: Company[] = [];
    employmentStatuses: EmploymentStatus[] = [];
    positions: Position[] = [];
    relationships: string[] = [];
    modal: Modal;

    ngOnInit() {
        this.getAllEmployees();
        this.modal = new Modal("#mdlModalInfo");
    }

    private getAllEmployees(): void {
        try {
            this.employees = [];
            this.loadingEmployees = true;
            this.isFormDisabled = true;

            this.employeeService.getAllEmployees().then((result) => {
                this.loadingEmployees = false;
                this.isFormDisabled = false;
                
                console.log(result);

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

    add(): void {
        this.currentEmployee = new Employee();
        this.modal.show();
        this.operation = 2;
    }

    view(employee: Employee): void {
        this.currentEmployee = employee;
        this.modal.show();
        this.operation = 0;
    }
}