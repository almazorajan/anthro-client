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

    private appendWorkHistory(): void {
        this.employee.workHistory.unshift(this.copyWorkHistory(this.workHistory));
        this.workHistoryModal.hide();
    }

    private cancelEditWorkHistory(): void {
        this.workHistory = this.copyWorkHistory(this.originalWorkHistory);
        this.originalWorkHistory = null;
        this.workHistoryModal.hide();
    }
    
    private updateWorkHistory(): void {
        this.employee.workHistory[this.currentIndex] = this.copyWorkHistory(this.workHistory);
        this.originalWorkHistory = null;
        this.workHistoryModal.hide();
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
}