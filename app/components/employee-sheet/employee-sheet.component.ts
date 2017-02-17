import { Component, OnInit } from '@angular/core';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { EmployeeSheetService } from './employee-sheet.service';
import { CompanyService } from '../company/company.service';
import { EmploymentStatusService } from '../employment-status/employment-status.service';
import { PositionService } from '../position/position.service';
import { EmploymentStatus, Employee, Position, Company, Family, Education, Accreditation, WorkHistory, Modal } from '../../models/model';

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
        private swal : SweetAlertService,
        private toastr : ToastrService,
        private employeeSheetService : EmployeeSheetService,
        private companyService : CompanyService,
        private employmentStatusService : EmploymentStatusService,
        private positionService : PositionService
    ) { }

    employee : Employee;
    loadingCompanies : boolean = false;
    loadingEmploymentStatuses : boolean = false;
    loadingPositions : boolean = false;
    isFormDisabled : boolean = false;
    readyToSave : boolean = false;
    addingEmployee : boolean = false;
    companies : Company[] = [];
    employmentStatuses : EmploymentStatus[] = [];
    positions : Position[] = [];
    relationships : string[] = [];
    educationalLevels : string[] = [];

    ngOnInit() {
        this.employee = new Employee();
        this.getCompanies();
        this.getEmploymentStatuses();
        this.getPositions();
        this.getRelationships();
        this.getEducationalLevels();
    }

    private setDefaultPosition() : void {
        if(this.positions.length <= 0) {
            return;
        }
        this.employee.position._id = this.positions[0]._id;
        this.employee.position.positionName = this.positions[0].positionName;
    }

    private setDefaultCompany() : void {
        if(this.companies.length <= 0) {
            return;
        }
        this.employee.company._id = this.companies[0]._id;
        this.employee.company.companyName = this.companies[0].companyName;
        this.employee.company.companyAddress = this.companies[0].companyAddress;
        this.employee.company.emailAddress = this.companies[0].emailAddress;
    }

    private setDefaultEmploymentStatus() : void {
        if(this.employmentStatuses.length <= 0) {
            return;
        }
        this.employee.employmentStatus._id = this.employmentStatuses[0]._id;
        this.employee.employmentStatus.employmentStatus = this.employmentStatuses[0].employmentStatus;
        this.employee.workHistory[0].employmentStatus._id = this.employmentStatuses[0]._id;
        this.employee.workHistory[0].employmentStatus.employmentStatus = this.employmentStatuses[0].employmentStatus;
    }

    private getCompanies() : void {
        try {
            this.companies = [];
            this.loadingCompanies = true;
            this.isFormDisabled = true;

            this.companyService.getAll().then((result) => {
                this.loadingCompanies = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.companies = result.data as Company[];
                    this.setDefaultCompany();
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

    private getEmploymentStatuses() : void {
        try {
            this.employmentStatuses = [];
            this.loadingEmploymentStatuses = true;
            this.isFormDisabled = true;

            this.employmentStatusService.getAll().then((result) => {
                this.loadingEmploymentStatuses = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.employmentStatuses = result.data as EmploymentStatus[];
                    this.setDefaultEmploymentStatus();
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

    private getPositions() : void {
        try {
            this.positions = [];
            this.loadingPositions = true;
            this.isFormDisabled = true;

            this.positionService.getAll().then((result) => {
                this.loadingPositions = false;
                this.isFormDisabled = false;

                if(result.success) {
                    this.positions = result.data as Position[];
                    this.setDefaultPosition();
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

    private getRelationships() : void {
        try {      
            this.relationships = this.employeeSheetService.getRelationships();
        } catch(e) {
            this.toastr.error(e);
        }
    }

    private getEducationalLevels() : void {
        try {
            this.educationalLevels = this.employeeSheetService.getEducationalLevels();
        } catch(e) {
            this.toastr.error(e);
        }
    }

    private isEmpty(str : string) : boolean {
        if(!str) return false;
        return str.trim().length <= 0;
    }

    private isNameValid(employee : Employee) : boolean {
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

    private isEmployeePositionValid(employee : Employee):  boolean {
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

    private isEmploymentStatusValid(employee : Employee) : boolean {
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

    private isMartialStatusValid(employee : Employee) : boolean {
        try {
            if(!employee)
                return false;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    private isValidFamily(employee : Employee) : boolean {
        try {
            if(!employee)
                return false;
            
            let uniqueRelationships = this.relationships.filter((relationship) => 
                relationship.toLowerCase().trim() === "father"
                || relationship.toLowerCase().trim() === "mother"
                || relationship.toLowerCase().trim() === "spouse");
                
            uniqueRelationships.forEach((relationship) => {
                let countOfRel = 0;

                this.employee.family.forEach((family) => {
                    if(family.relationship.toLowerCase().trim() === relationship.toLowerCase().trim()) {
                        countOfRel += 1;
                    }
                });

                if(countOfRel > 0) {
                    this.toastr.error(`Duplicate relationship: ${relationship}. Only one can be set.`);
                }

            });
            
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    public addFamily() : void {
        this.employee.family.unshift(new Family());
    }

    public addEducation() : void {
        this.employee.educationHistory.unshift(new Education());
    }

    public addCertification() : void {
        this.employee.certifications.unshift(new Accreditation());
    }

    public addLicensure() : void {
        this.employee.licensures.unshift(new Accreditation());
    
    }

    public addWorkHistory() : void {
        this.employee.workHistory.unshift(new WorkHistory());
    }

    public deleteEducation(education : Education) : void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this educational info",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    let index = this.employee.educationHistory.indexOf(education);
                    this.employee.educationHistory.splice(index, 1);
                    this.toastr.success("Successfully deleted educational info");
                }
            }
        });
    }

    public deleteCertification(certification : Accreditation) : void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this certification info",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    let index = this.employee.certifications.indexOf(certification);
                    this.employee.certifications.splice(index, 1);
                    this.toastr.success("Successfully deleted certification info");
                }
            }
        });
    }

    public deleteLicensure(licensure : Accreditation) : void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this licensure info",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    let index = this.employee.licensures.indexOf(licensure);
                    this.employee.licensures.splice(index, 1);
                    this.toastr.success("Successfully deleted certification info");
                }
            }
        });
    }

    public deleteFamily(family : Family) : void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this family info",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    let index = this.employee.family.indexOf(family);
                    this.employee.family.splice(index, 1);
                    this.toastr.success("Successfully deleted family info");
                }
            }
        });
    }

    public deleteWorkHistory(workHistory : WorkHistory) : void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this work history info",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    let index = this.employee.workHistory.indexOf(workHistory);
                    this.employee.workHistory.splice(index, 1);
                    this.toastr.success("Successfully deleted work history info");
                }
            }
        });
    }

    public computeAge() : void {
        try {
            var splitBirthDay = this.employee.birthDate.toString().split("-");
            var birthDay = new Date(parseInt(splitBirthDay[0]), parseInt(splitBirthDay[1]), parseInt(splitBirthDay[2]));
            var diff = Date.now() - birthDay.getTime();
            this.employee.age = Math.abs(new Date(diff).getUTCFullYear() - 1970);    
        } catch(e) {
            this.toastr.error(e);
        }
    }

    public isReadyToSave() {
        let condition1: boolean = this.isNameValid(this.employee);
        let condition2: boolean = this.employee.salary < 0;
        let condition3: boolean = this.isEmployeePositionValid(this.employee);
    }

    public addEmployee() : void {
        try {
            this.swal.confirm({
                title: "Are You Sure?",
                message: "You will be adding this employee info",
                confirmButtonText: "Yes, Add It!",
                callBack: (isConfirm) => {
                    if(isConfirm) {
                        this.addingEmployee = true;
                        this.employeeSheetService.add(this.employee).then((result) => {
                            this.addingEmployee = false;
                            if(result.success) {
                                this.employee = new Employee();
                                this.setDefaultCompany();
                                this.setDefaultEmploymentStatus();
                                this.setDefaultPosition();
                                this.toastr.success(result.message);
                            } else {
                                this.toastr.error(result.message);
                            }
                        })
                        .catch((error) => {
                            this.addingEmployee = false;
                            this.toastr.error(error);
                        }); 
                    }
                }
            });
        } catch(e) {
            this.toastr.error(e);
            this.addingEmployee = false;
        }
    }
}