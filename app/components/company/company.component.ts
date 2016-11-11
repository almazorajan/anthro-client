import { Component, OnInit } from '@angular/core';

import { Company, Modal } from '../../models/model';

import { CompanyService } from './company.service';
import { SweetAlertService, ToastrService } from '../../shared-services/services';

@Component({
    selector: 'company-component',
    templateUrl: './app/components/company/company-page.html',
    providers: [
        SweetAlertService,
        ToastrService,
        CompanyService
    ]
})

export class CompanyComponent implements OnInit {

    constructor(
        private swal: SweetAlertService,
        private toastr: ToastrService,
        private companyService: CompanyService
    ) { }

    ngOnInit() {

        this.modal = new Modal("#mdlModalInfo");

    }

    selectedCompany: Company;
    originalCompanyInfo: Company;

    loadingCompanies: boolean;
    addingCompany: boolean;
    updatingCompany: boolean;
    deletingCompany: boolean;

    isFormDisabled: boolean;

    modal: Modal;

    getAll(): void {

        try {

            this.loadingCompanies = true;
            this.isFormDisabled = true;

            this.companyService.getAll().then((result) => {

                this.loadingCompanies = false;
                this.isFormDisabled = false;

                if(result.success) {

                    this.toastr.success(result.message);

                } else {

                    this.toastr.error(result.message);

                }


            })
            .catch((error) => {
                
                this.loadingCompanies = true;
                this.isFormDisabled = true;
                this.toastr.error(error);

            })

        } catch(e) {
            
            this.loadingCompanies = false;
            this.isFormDisabled = false;
            this.toastr.error(e);

        }

    }

}