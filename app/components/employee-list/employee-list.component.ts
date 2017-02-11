import { Component, OnInit } from '@angular/core';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { EmployeeListService } from './employee-list.service';
import { CompanyService } from '../company/company.service';
import { EmploymentStatusService } from '../employment-status/employment-status.service';
import { PositionService } from '../position/position.service';
import { EmploymentStatus, Employee, Position, Company, Family, Education, Accreditation, WorkHistory, Modal } from '../../models/model';

@Component({
    selector: 'employee-list-component',
    templateUrl: './app/components/employee-list/employee-list-page.html',
    providers: [
        SweetAlertService,
        ToastrService,
        EmployeeListService,
        CompanyService,
        EmploymentStatusService,
        PositionService
    ]
})

export class EmployeeListComponent implements OnInit {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService,
        private employeeListService: EmployeeListService,
        private companyService: CompanyService,
        private employmentStatusService: EmploymentStatusService,
        private positionService: PositionService
    ) { }

    loadingEmployees: boolean = false;
    loadingCompanies: boolean = false;
    loadingEmploymentStatuses: boolean = false;
    loadingPositions: boolean = false;
    isFormDisabled: boolean = false;
    readyToSave: boolean = false;
    addingEmployee: boolean = false;
    employees: Employee[] = [];
    companies: Company[] = [];
    employmentStatuses: EmploymentStatus[] = [];
    positions: Position[] = [];
    relationships: string[] = [];

    ngOnInit() {
        this.getAllEmployees();
    }

    private getAllEmployees() {
        try {
            this.employees = [];
            this.loadingEmployees = true;
            this.isFormDisabled = true;

            this.employeeListService.getAllEmployees().then((result) => {
                this.loadingEmployees = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.employees = result.data as Employee[];
                    console.log(result.data);
                    toastr.success(result.message);
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

    private getCompanies(): void {
        try {
            this.companies = [];
            this.loadingCompanies = true;
            this.isFormDisabled = true;

            this.companyService.getAll().then((result) => {
                this.loadingCompanies = false;
                this.isFormDisabled = false;

                if (result.success) {
                    this.companies = result.data as Company[];
                    //this.setDefaultCompany();
                    this.toastr.success(result.message);
                } else {
                    this.toastr.error(result.message);
                }
            })
            .catch((error) => {
                this.loadingCompanies = false;
                this.isFormDisabled = false;
                this.toastr.error(error);
            });
        } catch (e) {
            this.loadingCompanies = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    private getEmploymentStatuses(): void {
        try {
            this.employmentStatuses = [];
            this.loadingEmploymentStatuses = true;
            this.isFormDisabled = true;

            this.employmentStatusService.getAll().then((result) => {
                this.loadingEmploymentStatuses = false;
                this.isFormDisabled = false;

                if (result.success) {
                    this.employmentStatuses = result.data as EmploymentStatus[];
                    //this.setDefaultEmploymentStatus();
                    this.toastr.success(result.message);
                } else {
                    this.toastr.error(result.message);
                }
            })
                .catch((error) => {
                    this.loadingEmploymentStatuses = false;
                    this.isFormDisabled = false;
                    this.toastr.error(error);
                });
        } catch (e) {
            this.loadingEmploymentStatuses = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    private getPositions(): void {
        try {
            this.positions = [];
            this.loadingPositions = true;
            this.isFormDisabled = true;

            this.positionService.getAll().then((result) => {
                this.loadingPositions = false;
                this.isFormDisabled = false;

                if (result.success) {
                    this.positions = result.data as Position[];
                    //this.setDefaultPosition();
                    this.toastr.success(result.message);
                } else {
                    this.toastr.error(result.message);
                }
            })
                .catch((error) => {
                    this.loadingPositions = false;
                    this.isFormDisabled = false;
                    this.toastr.error(error);
                });
        } catch (e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    private getRelationships(): void {
        try {
            //this.relationships = this.employeeSheetService.getRelationships();
        } catch (e) {
            this.toastr.error(e);
        }
    }
}