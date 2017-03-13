"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DateService = (function () {
    function DateService() {
    }
    DateService.prototype.getMonths = function () {
        var months = [
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
    };
    DateService.prototype.getAvailableDays = function (month, year) {
        var limit = 31;
        var isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        var days = [];
        if (month.toLowerCase().indexOf("feb") > -1) {
            if (isLeapYear) {
                limit = 29;
            }
            else {
                limit = 28;
            }
        }
        for (var i = 1; i <= limit; i++) {
            days.push(i);
        }
        return days;
    };
    DateService.prototype.getAvailableYears = function () {
        var latestYear = new Date().getFullYear();
        var limit = 70;
        var years = [];
        for (var i = latestYear - limit; i <= latestYear; i++) {
            years.push(i);
        }
        return years;
    };
    return DateService;
}());
DateService = __decorate([
    core_1.Injectable()
], DateService);
exports.DateService = DateService;
//# sourceMappingURL=date.service.js.map