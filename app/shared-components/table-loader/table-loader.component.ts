import { Component, Input } from '@angular/core';

@Component({
    selector: 'table-loader',
    templateUrl: './app/shared-components/table-loader/table-loader-template.html'
})

export class TableLoaderComponent {

    @Input() colSpanSize: number = 0;
    @Input() message: string = "";
    @Input() condition: boolean = false;

}