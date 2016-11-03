import { Injectable } from '@angular/core';

@Injectable() export class DateFormatter {

    formatDate(date: Date): string {

        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();

        return [month, day, year].join("/");

    }

}