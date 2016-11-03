import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'table-loader',
    templateUrl: './app/shared-components/table-loader/table-loader-template.html'
})

export class TableLoaderComponent implements OnInit {

    @Input() colSpanSize: number = 0;
    @Input() message: string = "";
    @Input() condition: boolean = false;

    ngOnInit() {

        console.log("colspan size", this.colSpanSize);
        console.log("message", this.message);
        console.log("condition", this.condition);

    }

}