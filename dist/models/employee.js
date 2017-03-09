"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var Employee = (function () {
    function Employee() {
        this._id = "";
        this.employeeNumber = "";
        this.startingDate = new Date();
        this.salary = 0;
        this.position = new models_1.Position();
        this.company = new models_1.Company();
        this.employmentStatus = new models_1.EmploymentStatus();
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.birthDate = new Date();
        this.age = 0;
        this.birthPlace = "";
        this.phoneNumbers = [];
        this.landlines = [];
        this.maritalStatus = "Single";
        this.gender = "Male";
        this.citizenship = "Filipino";
        this.cityAddress = new models_1.Address();
        this.provincialAddress = new models_1.Address();
        this.permanentAddress = new models_1.Address();
        this.ssNumber = "";
        this.tinNumber = "";
        this.philHealthNumber = "";
        this.pagibigNumber = "";
        this.educationHistory = [];
        this.certifications = [];
        this.licensures = [];
        this.workHistory = [];
        this.family = [];
    }
    return Employee;
}());
exports.Employee = Employee;
;
//# sourceMappingURL=employee.js.map