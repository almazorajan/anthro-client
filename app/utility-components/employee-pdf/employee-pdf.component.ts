import { Component, Input } from '@angular/core';

@Component({
    selector: 'employee-pdf-component',
    templateUrl: './app/utility-components/employee-pdf/employee-pdf.page.html',
})

export class EmployeePdfComponent {

    @Input() id: string;    

}
