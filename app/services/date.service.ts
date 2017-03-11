import { Injectable } from '@angular/core';
import { Company, Result } from '../models/models';
import { ProviderService } from './provider.service';

@Injectable() 
export class DateService {

    getMonths(): string[] {
        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        return months;
    }

    getAvailableDays(month: string, year: number): number[] {
        var limit = 31;
        var isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        var days = [];

        if (month.toLowerCase().indexOf("feb") > -1) {
            if (isLeapYear) {
                limit = 29;
            } else {
                limit = 28;
            }
        }

        for (var i = 1; i <= limit; i++) {
            days.push(i);
        }

        return days;
    }

    getAvailableYears(): number[] {
        var latestYear = new Date().getFullYear();
        var limit = 70;
        var years = [];
        
        for (var i = latestYear - limit; i <= latestYear; i++) {
            years.push(i);
        }

        return years;
    }
    
}