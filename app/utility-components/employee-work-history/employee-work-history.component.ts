import { Component, OnInit, Input } from '@angular/core';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { EmploymentStatusService } from '../../services/services';
import { Employee, WorkHistory, EmploymentStatus, Modal } from '../../models/models';

@Component({
    selector: 'employee-work-history-component',
    templateUrl: './app/components/employee-work-history/employee-work-history.page.html',
    providers: [
        SwalHelper,
        ToastHelper,
        EmploymentStatusService
    ]
})

export class EmployeeWorkHistoryComponent implements OnInit {

    constructor(
        private swal: SwalHelper,
        private toast: ToastHelper,
        private employmentStatusService: EmploymentStatusService
    ) { }    

    @Input() employee: Employee;
    @Input() operation: number;
    @Input() isFormDisabled: boolean;

    currentIndex: number;
    workHistory: WorkHistory;
    originalWorkHistory: WorkHistory;
    isWorkHistoryFormDisabled: boolean;
    workHistoryOperation: number;
    workHistoryModal: Modal;
    employmentStatuses: EmploymentStatus[];
    loadingEmploymentStatuses: boolean = false;
    
    ngOnInit() {
        this.workHistoryModal = new Modal("#mdlWorkHistory");
        this.getAllEmploymentStatus();
    }    

    set dateFrom(e) {
        try {
            let f: any = e.split('-');
            let d = new Date(Date.UTC(f[0], f[1] - 1, f[2]));
            this.workHistory.dateFrom.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
        } catch (e) {
            console.log(e);
        }
    }

    get dateFrom() {
        let def = new Date().toISOString().substring(0, 10);

        try {
            if (!this.employee) {
                return def;
            }

            if (!this.workHistory) {
                return def;
            }

            if (typeof this.workHistory.dateFrom.toISOString !== "function") {
                this.workHistory.dateFrom = new Date(this.workHistory.dateFrom);
            }

            return this.workHistory.dateFrom.toISOString().substring(0, 10);
        } catch (e) {
            console.log(e);
        }

        return def;
    }

    set dateTo(e) {
        try {
            let f: any = e.split('-');
            let d = new Date(Date.UTC(f[0], f[1] - 1, f[2]));
            this.workHistory.dateTo.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
        } catch (e) {
            console.log(e);
        }
    }

    get dateTo() {
        let def = new Date().toISOString().substring(0, 10);

        try {
            if (!this.employee) {
                return def;
            }

            if (!this.workHistory) {
                return def;
            }

            if (typeof this.workHistory.dateTo.toISOString !== "function") {
                this.workHistory.dateTo = new Date(this.workHistory.dateTo);
            }

            return this.workHistory.dateTo.toISOString().substring(0, 10);
        } catch (e) {
            console.log(e);
        }

        return def;
    }

    private getAllEmploymentStatus(): void {
        this.isWorkHistoryFormDisabled = true;
        this.employmentStatuses = [];
        
        this.employmentStatusService.getAll().then((result) => {
            this.isWorkHistoryFormDisabled = false;

            if (result.success) {
                this.employmentStatuses = result.data as EmploymentStatus[];
            } else {
                this.toast.error(result.message);
            }
        }).catch((e) => {
            this.isWorkHistoryFormDisabled = false;
            this.toast.error(e || e.message);
        })
    }
    
    private copyWorkHistory(workHistory: WorkHistory): WorkHistory {
        return JSON.parse(JSON.stringify(workHistory)) as WorkHistory;
    }

    private resolveEmploymentStatus(workHistory: WorkHistory): void {
        if (workHistory) {
            if (workHistory.employmentStatus) {
                for (let key in this.employmentStatuses) {               
                    let employmentStatus = this.employmentStatuses[key];

                    if (workHistory.employmentStatus._id === employmentStatus._id) {
                        workHistory.employmentStatus.employmentStatus = employmentStatus.employmentStatus
                        return;
                    }
                }
            }   
        }
        workHistory.employmentStatus.employmentStatus = "";
    }

    private appendWorkHistory(): void {
        this.resolveEmploymentStatus(this.workHistory);
        this.employee.workHistory.unshift(this.copyWorkHistory(this.workHistory));
        this.workHistoryModal.hide();
    }

    private cancelEditWorkHistory(): void {
        this.workHistory = this.copyWorkHistory(this.originalWorkHistory);
        this.originalWorkHistory = null;
        this.workHistoryModal.hide();
    }
    
    private updateWorkHistory(): void {
        this.resolveEmploymentStatus(this.workHistory);
        this.employee.workHistory[this.currentIndex] = this.copyWorkHistory(this.workHistory);
        this.originalWorkHistory = null;
        this.workHistoryModal.hide();
    }

    private cancelUpdateWorkHistory(): void {
        this.workHistory = this.copyWorkHistory(this.originalWorkHistory);
        this.originalWorkHistory = null;
        this.workHistoryModal.hide();
    }

    private deleteWorkHistory(workHistory: WorkHistory): void {
        let index = this.employee.workHistory.indexOf(workHistory);
        this.employee.workHistory.splice(index, 1);
    }

    parseDate(dateString: string): Date {
        if(dateString) {
            return new Date(dateString);
        }
        return null;
    }

    addWorkHistory(): void {
        this.workHistoryOperation = 2;
        this.isWorkHistoryFormDisabled = false;
        this.workHistory = new WorkHistory();
        this.workHistoryModal.show();
    }

    editWorkHistory(workHistory: WorkHistory, index: number): void {
        this.workHistoryOperation = 1;
        this.isWorkHistoryFormDisabled = false;
        this.currentIndex = index;
        this.workHistory = this.copyWorkHistory(this.workHistory);
        this.originalWorkHistory = this.copyWorkHistory(this.workHistory);
        this.workHistoryModal.show();
    }

    confirmAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be adding this work history information",
            confirmButtonText: "Yes, Add It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.appendWorkHistory();
                }
            }
        });
    }

    confirmUpdateWorkHistory(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be updating this work history information",
            confirmButtonText: "Yes, Update It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.updateWorkHistory();
                }
            }
        });
    }

    confirmCancelUpdate(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this work history information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.cancelUpdateWorkHistory();
                }
            }
        });
    }    

    confirmCancelAdd(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this work history information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.appendWorkHistory();
                }
            }
        });
    }

    confirmCancelEdit(): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be cancelling this work history information",
            confirmButtonText: "Yes, Cancel It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.cancelEditWorkHistory();
                }
            }
        });
    }

    confirmDeleteWorkHistory(workHistory: WorkHistory): void {
        this.swal.confirm({
            title: "Are You Sure?",
            message: "You will be deleting this work history information",
            confirmButtonText: "Yes, Delete It!",
            callBack: (isConfirm) => {
                if(isConfirm) {
                    this.deleteWorkHistory(workHistory);
                }
            }
        });
    }

    validateEmploymentStatus(workHistory: WorkHistory): string {
        if (!workHistory)
            return "";
        
        if (!workHistory.employmentStatus)
            return "";
        
        return workHistory.employmentStatus.employmentStatus;
    }
}