"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var Employee = (function () {
    function Employee() {
        this.employeeNumber = "";
        this.startingDate = new Date();
        this.salary = 0;
        this.position = new model_1.Position();
        this.position._id = "";
        this.position.positionName = "";
        this.company = new model_1.Company();
        this.company._id = "";
        this.company.companyName = "";
        this.company.companyAddress = "";
        this.company.contactNumber = "";
        this.company.emailAddress = "";
        this.employmentStatus = new model_1.EmploymentStatus();
        this.employmentStatus._id = "";
        this.employmentStatus.employmentStatus = "";
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.birthDate = new Date();
        this.age = 0;
        this.birthPlace = "";
        this.phoneNumbers = [new model_1.ContactNumber()];
        this.landlines = [new model_1.ContactNumber()];
        this.maritalStatus = "Single";
        this.gender = "Male";
        this.citizenship = "Filipino";
        this.cityAddress = new model_1.Address();
        this.provincialAddress = new model_1.Address();
        this.permanentAddress = new model_1.Address();
        this.ssNumber = "";
        this.tinNumber = "";
        this.philHealthNumber = "";
        this.pagibigNumber = "";
        this.educationHistory = [new model_1.Education()];
        this.certifications = [new model_1.Accreditation()];
        this.licensures = [new model_1.Accreditation()];
        this.workHistory = [new model_1.WorkHistory()];
        this.family = [new model_1.Family()];
    }
    return Employee;
}());
exports.Employee = Employee;
;
//# sourceMappingURL=employee.js.map