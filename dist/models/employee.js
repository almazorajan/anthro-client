"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var Employee = (function () {
    function Employee() {
        this.employeeNumber = "";
        this.startingDate = new Date();
        this.salary = 0;
        this.position = new models_1.Position();
        this.position._id = "";
        this.position.positionName = "";
        this.company = new models_1.Company();
        this.company._id = "";
        this.company.companyName = "";
        this.company.companyAddress = "";
        this.company.contactNumber = "";
        this.company.emailAddress = "";
        this.employmentStatus = new models_1.EmploymentStatus();
        this.employmentStatus._id = "";
        this.employmentStatus.employmentStatus = "";
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.birthDate = new Date();
        this.age = 0;
        this.birthPlace = "";
        this.phoneNumbers = [new models_1.ContactNumber()];
        this.landlines = [new models_1.ContactNumber()];
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
        this.educationHistory = [new models_1.Education()];
        this.certifications = [new models_1.Accreditation()];
        this.licensures = [new models_1.Accreditation()];
        this.workHistory = [new models_1.WorkHistory()];
        this.family = [new models_1.Family()];
    }
    return Employee;
}());
exports.Employee = Employee;
;
//# sourceMappingURL=employee.js.map