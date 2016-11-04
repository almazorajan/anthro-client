import { Component, OnInit } from '@angular/core';

import { ModuleService } from './module.service';
import { SweetAlertService, ToastrService } from '../../shared-services/services';
import { Module } from '../../models/model';

@Component({
    selector: 'module-component',
    templateUrl: './app/components/module/module-page.html',
    providers: [
        ModuleService,
        SweetAlertService,
        ToastrService
    ]
})

export class ModuleComponent implements OnInit {

    loading: boolean = false;

    selectedModule: Module;
    originalData: Module;

    modules: Module[] = [];
    groups: string[];

    isFormDisabled: boolean = true;
    operation: number = 0; // 0 view, 1 add, 2 edit

    constructor(
        private moduleService: ModuleService, 
        private swal: SweetAlertService,
        private toastr: ToastrService) {

    }

    ngOnInit() {

        this.getGroups();
        this.getAllModules();

    }

    getAllModules(): void {
        
        this.loading = true;

        this.moduleService.getAll().then((result) => {

            this.modules = result.data as Module[];     
            this.loading = false;
            this.toastr.success("Successfully loaded all modules");

        })
        .catch((error) => {

            this.loading = false;
            this.toastr.error(error);

        });

    }

    getGroups(): void {

        this.groups = this.moduleService.getGroups();

    }

    view(mod: Module): void {

        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedModule = mod;

    }

    add(): void {

        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedModule = new Module();

    }

    edit(): void {

        this.operation = 2;
        this.isFormDisabled = false;
        this.originalData = Object.assign({}, this.selectedModule);

    }

    cancelEdit(): void {

        this.operation = 0;
        this.isFormDisabled = true;
        this.selectedModule = Object.assign({}, this.originalData);
        this.originalData = null;

    }

    confirmUpdate(): void {

        this.swal.confirm("Are you sure?", "You will be updating the selected module", (isConfirm) => {

        });

    }

    confirmDelete(mod: Module): void {

        this.swal.confirm("Are you sure?", "You will be deleting the selected module", (isConfirm) => {

        });

    }

}