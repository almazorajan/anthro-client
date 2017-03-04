"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var WorkHistory = (function () {
    function WorkHistory() {
        this.position = "";
        this.companyName = "";
        this.dateFrom = new Date();
        this.dateTo = new Date();
        this.isPresent = false;
        this.employmentStatus = new models_1.EmploymentStatus();
        this.salary = 0;
        this.reasonForLeaving = "";
    }
    return WorkHistory;
}());
exports.WorkHistory = WorkHistory;
//# sourceMappingURL=work-history.js.map