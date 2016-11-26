import { Component, OnInit } from '@angular/core';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { EmployeeSheetService } from './employee-sheet.service';
import { CompanyService } from '../company/company.service';
import { EmploymentStatusService } from '../employment-status/employment-status.service';
import { PositionService } from '../position/position.service';
import { EmploymentStatus, Employee, Position, Company, Modal } from '../../models/model';

@Component({
    selector: 'employee-sheet-component',
    templateUrl: './app/components/employee-sheet/employee-sheet-page.html',
    styleUrls: [
        './app/components/employee-sheet/employee-sheet-style.css'
    ],
    providers: [
        SweetAlertService,
        ToastrService,
        EmployeeSheetService,
        CompanyService,
        EmploymentStatusService,
        PositionService
    ]
})

export class EmployeeSheetComponent implements OnInit {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService,
        private employeeSheetService: EmployeeSheetService,
        private companyService: CompanyService,
        private employmentStatusService: EmploymentStatusService,
        private positionService: PositionService
    ) { }

    ngOnInit() {
        this.employee = new Employee();
        this.toastr.info("Loading resources...");
        this.getCompanies();
        this.getEmploymentStatuses();
        this.getPositions();
    }

    employee: Employee;
    loadingCompanies: boolean = false;
    loadingEmploymentStatuses: boolean = false;
    loadingPositions: boolean = false;
    isFormDisabled: boolean = false;
    readyToSave: boolean = false;
    companies: Company[] = [];
    employmentStatuses: EmploymentStatus[] = [];
    positions: Position[] = [];
    relationships: string[] = [];

    private getCompanies(): void {
        try {
            this.companies = [];
            this.loadingCompanies = true;
            this.isFormDisabled = true;

            this.companyService.getAll().then((result) => {
                this.loadingCompanies = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.companies = result.data as Company[];
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
        } catch(e) {
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

                if(result.success) {
                    this.employmentStatuses = result.data as EmploymentStatus[];
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
        } catch(e) {
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

                if(result.success) {
                    this.positions = result.data as Position[];
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
        } catch(e) {
            this.loadingPositions = false;
            this.isFormDisabled = false;
            this.toastr.error(e);
        }
    }

    private getRelationships(): void {
        try {      
            this.relationships = this.employeeSheetService.getRelationships();
        } catch(e) {
            this.toastr.error(e);
        }
    }

    private isEmpty(str: string): boolean {
        if(!str) return false;
        return str.trim().length <= 0;
    }

    private isNameValid(employee: Employee): boolean {
        try {
            if(!employee)
                return false;
            
            if(!employee.firstName)
                return false;
            
            if(!employee.lastName)
                return false;
            
            if(this.isEmpty(employee.firstName))
                return false;
            
            if(this.isEmpty(employee.lastName))
                return false;
            
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    private isEmployeePositionValid(employee: Employee): boolean {
        try {      
            if(!employee)
                return false;
            
            if(!employee.position)
                return false;
            
            if(!employee.position._id)
                return false;

            if(!employee.position._id.trim())
                return false;
            
            if(this.positions.filter((position) => position._id === employee.position._id).length !== 1)
                return false;

            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    private isEmploymentStatusValid(employee: Employee): boolean {
        try {
            if(!employee)
                return false;
            
            if(!employee.employmentStatus)
                return false;
            
            if(!employee.employmentStatus._id)
                return false;
            
            if(!employee.employmentStatus._id.trim())
                return false;

            if(this.employmentStatuses.filter((employmentStatus) => employmentStatus._id === employee.employmentStatus._id).length !== 1)
                return false;

            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    private isMartialStatusValid(employee: Employee): boolean {
        try {
            if(!employee)
                return false;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    public isReadyToSave() {
        let condition1: boolean = this.isNameValid(this.employee);
        let condition2: boolean = this.employee.salary < 0;
        let condition3: boolean = this.isEmployeePositionValid(this.employee);
    }
}