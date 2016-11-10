import { Component, OnInit } from '@angular/core';

import { SweetAlertService, ToastrService } from '../../shared-services/services';

import { EmploymentStatus, Modal } from '../../models/model';

@Component({
    selector: 'employment-status-component',
    templateUrl: './app/components/position/position-page.html',
    providers: [
        SweetAlertService,
        ToastrService
    ]
})

export class EmploymentStatusComponent {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService) { }
    
    selectedEmploymentStatus: EmploymentStatus;
    originalEmploymentStatusInfo: EmploymentStatus;

    loadingEmploymentStatus: boolean;

    addingEmploymentStatus: boolean;
    updatingEmploymentStatus: boolean;
    deletingEmploymentStatus: boolean;

}