import { Component, OnInit } from '@angular/core';
import { ModuleService } from './module.service';

import { Module } from '../../models/model';

@Component({
    selector: 'module-component',
    templateUrl: './app/components/module/module-page.html',
    providers: [
        ModuleService
    ]
})

export class ModuleComponent implements OnInit {

    loading: boolean = false;
    modules: Module[] = [];

    ngOnInit() {
        console.log(this.modules.length);        
    }

    constructor(private moduleService: ModuleService) {

    }

}