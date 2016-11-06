import { Component, OnInit } from '@angular/core';

import { PositionService } from './position.service';
import { ModuleService } from '../module/module.service';
import { SweetAlertService, ToastrService } from '../../shared-services/services';

import { Module, Position } from '../../models/model';

@Component({
    selector: 'position-component',
    templateUrl: './app/components/position/position-page.html',
    providers: [
        PositionService,
        ModuleService,
        SweetAlertService,
        ToastrService
    ]
})

export class PositionComponent implements OnInit {

    modules: Module[];
    positions: Position[];
    selectedPosition: Position;

    loadingModules: boolean;
    loadingPositions: boolean;

    isFormDisabled: boolean;

    constructor(
        private positionService: PositionService, 
        private moduleService: ModuleService,
        private swal: SweetAlertService,
        private toastr: ToastrService) {}

    ngOnInit() {

        this.getAllModules();
        this.getAllPositions();

    }

    getAllModules(): void {

        this.modules = [];

        this.loadingModules = true;
        this.isFormDisabled = true;

        this.moduleService.getAll().then((result) => {

            this.loadingModules = false;
            this.isFormDisabled = false;

            if(result.success) {

                this.modules = result.data as Module[];
                this.toastr.success(result.message);
                return;

            }

            this.toastr.error(result.message);
            
        })
        .catch((error) => {
            
            this.loadingModules = false;
            this.isFormDisabled = false;

        });

    }

    getAllPositions(): void {

        this.positions = [];

        this.loadingPositions = true;
        this.isFormDisabled = true;

        this.positionService.getAll().then((result) => {

            this.loadingPositions = false;
            this.isFormDisabled = false;

            if(result.success) {

                this.positions = result.data as Position[];
                this.toastr.success(result.message);
                return;

            }

            this.toastr.error(result.message);

        })
        .catch((error) => {

            this.loadingPositions = false;
            this.isFormDisabled = false;

            this.toastr.error(error);

        });

    }

}