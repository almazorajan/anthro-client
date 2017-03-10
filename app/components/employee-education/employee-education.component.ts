import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Employee, Education, Modal } from '../../models/models';

@Component({
    selector: 'employee-education-component',
    templateUrl: './app/components/employee-education/employee-education.page.html',
    providers: [
        SwalHelper,
        ToastHelper
    ]
})

export class EmployeeEducationComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    currentIndex: number;    
    educationOperation: number;    
    isEducationFormDisabled: boolean;    
    education: Education;
    originalEducationInfo: Education;
    educationModal: Modal;

    ngOnInit() {
        this.educationModal = new Modal("#mdlEducationInfo");
    }
    
    set dateGraduated(e) {
        try {
            let f: any = e.split('-');
            let d = new Date(Date.UTC(f[0], f[1] - 1, f[2]));
            this.education.dateGraduated.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
        } catch (e) {
            console.log(e);
        }
    }

    get dateGraduated() {
        let def = new Date().toISOString().substring(0, 10);

        try {
            if (!this.employee) {
                return def;
            }

            if (!this.education) {
                return def;
            }

            if (typeof this.employee.birthDate.toISOString !== "function") {
                this.education.dateGraduated = new Date(this.education.dateGraduated);
            }

            return this.employee.birthDate.toISOString().substring(0, 10);
        } catch (e) {
            console.log(e);
        }

        return def;
    }

    private copyEducation(education: Education): Education {
        return JSON.parse(JSON.stringify(education)) as Education;
    }    

    private appendEducation(): void {
        this.employee.educationHistory.push(this.copyEducation(this.education));
        this.educationModal.hide();
    }

    private cancelAppendEducation(): void {
        this.education = null;
        this.educationModal.hide();
    }

    private updateEducation(): void {
        this.employee.educationHistory[this.currentIndex] = this.copyEducation(this.education);
        this.originalEducationInfo = null;
        this.educationModal.hide();
    }

    private cancelUpdateEducation(): void {
        this.education = this.copyEducation(this.originalEducationInfo);
        this.originalEducationInfo = null;
        this.educationModal.hide();    
    }    

    private deleteEducation(education: Education): void {
        let index = this.employee.educationHistory.indexOf(education);
        this.employee.educationHistory.splice(index, 1);
        this.educationModal.hide();
    }

    parseDate(dateString: string): Date {
        if(dateString) {
            return new Date(dateString);
        }
        return null;
    }
    
    addEducation(): void {
        this.educationOperation = 2;
        this.isEducationFormDisabled = false;
        this.education = new Education();
        this.educationModal.show();
    }    
    
    editEducation(education: Education, index: number): void {
        this.educationOperation = 1;
        this.isEducationFormDisabled = false;
        this.currentIndex = index;
        this.education = this.copyEducation(education);
        this.originalEducationInfo = this.copyEducation(this.education);
        this.educationModal.show();
    }
    
    confirmAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this education information",
            confirmButtonText: "Yes, Add It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.appendEducation();
                }
            }
        });
    }

    confirmUpdate(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this education information",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.updateEducation();
                }
            }
        });
    }    

    confirmCancelAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this education information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.cancelAppendEducation();
                }
            }
        });
    }

    confirmCancelUpdate(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this education information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.cancelUpdateEducation();
                }
            }
        });
    }

    confirmDeleteEducation(education: Education): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this education information",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteEducation(education);
                }
            }
        });
    }
}
