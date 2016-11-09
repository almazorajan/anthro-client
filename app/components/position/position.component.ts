import { Component, OnInit } from '@angular/core';

import { PositionService } from './position.service';
import { ModuleService } from '../module/module.service';
import { SweetAlertService, ToastrService } from '../../shared-services/services';

import { Module, Position, Modal } from '../../models/model';

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

    modal: Modal;
    operation: number = 0;

    moduleSelector: boolean = false;
    loadingModules: boolean;
    loadingPositions: boolean;

    addingPosition: boolean = false;
    updatingPosition: boolean = false;
    deletingPosition: boolean = false;

    isFormDisabled: boolean;

    constructor(
        private positionService: PositionService, 
        private moduleService: ModuleService,
        private swal: SweetAlertService,
        private toastr: ToastrService) {}

    ngOnInit() {

        this.modal = new Modal("#mdlModalInfo");

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

    add() {

        this.operation = 1;
        this.isFormDisabled = false;
        this.selectedPosition = new Position();
        
    }

    confirmAdd() {

        if(!this.selectedPosition.positionName.trim()) {

            this.toastr.warn("Please provide a position name.");
            return;

        }

        this.selectedPosition.modules = [];

        for(let i=0; i < this.modules.length; i++) {

            if(this.modules[i].selected) 
                this.selectedPosition.modules.push(this.modules[i]);

        }

        if(this.selectedPosition.modules.length <= 0) {

            this.toastr.warn("Please select atleast one(1) module.");
            return;

        }

        this.swal.confirm({
            title: "Are you sure?",
            message: "You will be adding a new position.",
            confirmButtonText: "Yes, Add",
            callBack: (isConfirm) => {

            }
        });

    }

    private addPosition() {

        try {
     
            this.addingPosition = true;
            this.isFormDisabled = true;

            this.positionService.addPosition(this.selectedPosition).then((result) => {

                this.addingPosition = false;
                this.isFormDisabled = false;

                if(result.success) {

                    this.modal.hide();
                    this.toastr.success(result.message);
                    this.getAllPositions();
                    this.getAllModules();
                    this.toggleModuleSelection(false);
                    return;

                } 

                this.toastr.error(result.message);

            })
            .catch((error) => {

                this.addingPosition = false;
                this.isFormDisabled = false;
                this.toastr.error(error.toString());

            });

        } catch(e) {

            this.addingPosition = false;
            this.isFormDisabled = false;

            this.toastr.error((e || e.message).toString());

        }

    }

    toggleModuleSelection(val: boolean) {

        for(let i=0; i < this.modules.length; i++) {

            this.modules[i].selected = val;

        }

    }

}