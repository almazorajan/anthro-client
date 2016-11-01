import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/model';

@Component({
    selector: 'employee-sheet-component',
    templateUrl: './app/components/employee-sheet/employee-sheet-page.html'
})

export class EmployeeSheetComponent implements OnInit {

    employee: Employee = new Employee();

    ngOnInit() {
    }


}