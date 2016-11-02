import { Component, OnInit } from '@angular/core';
import { ModuleService } from './module.service';

@Component({
    selector: 'module-component',
    templateUrl: './app/components/module/module-page.html',
    providers: [
        ModuleService
    ]
})

export class ModuleComponent implements OnInit {

    ngOnInit() {
        
    }

    constructor(private moduleService: ModuleService) {

    }

}