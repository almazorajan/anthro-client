"use strict";
var model_1 = require('./model');
var Employee = (function () {
    function Employee() {
        this._id = "";
        this.employeeNumber = "";
        this.startingDate = new Date();
        this.salary = 0;
        this.position = new model_1.Position();
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.birthDate = new Date();
        this.age = 0;
        this.birthPlace = "";
        this.phoneNumbers = [new model_1.ContactNumber()];
        this.landlines = [new model_1.ContactNumber()];
        this.maritalStatus = "Single";
        this.gender = "";
        this.citizenship = "";
        this.cityAddress = new model_1.Address();
        this.provincialAddress = new model_1.Address();
        this.permanentAddress = new model_1.Address();
        this.ssNumber = "";
        this.tinNumber = "";
        this.philHealthNumber = "";
        this.pagibigNumber = "";
        this.educationHistory = [new model_1.EducationHistory()];
        this.certifications = [new model_1.Accreditation()];
        this.licensures = [new model_1.Accreditation()];
        this.workHistory = [new model_1.WorkHistory()];
        this.fathersInfo = new model_1.FamilyBackground();
        this.mothersInfo = new model_1.FamilyBackground();
        this.spouseInfo = new model_1.FamilyBackground();
        this.childrenInfo = [new model_1.FamilyBackground()];
        this.childrenInfo = [new model_1.FamilyBackground()];
    }
    Employee.prototype.addPhoneNumber = function () {
        this.phoneNumbers.push(new model_1.ContactNumber());
    };
    Employee.prototype.deletePhoneNumber = function (phoneNumber) {
        var index = this.phoneNumbers.indexOf(phoneNumber);
        this.phoneNumbers.splice(index, 1);
    };
    Employee.prototype.addLandline = function () {
        this.landlines.push(new model_1.ContactNumber());
    };
    Employee.prototype.deleteLandline = function (contactNumber) {
        var index = this.landlines.indexOf(contactNumber);
        this.landlines.splice(index, 1);
    };
    Employee.prototype.addEducationHistory = function () {
        this.educationHistory.push(new model_1.EducationHistory());
    };
    Employee.prototype.deleteEducationHistory = function (educationHistory) {
        var index = this.educationHistory.indexOf(educationHistory);
        console.log("index", index);
        this.educationHistory.splice(index, 1);
    };
    Employee.prototype.addCertifications = function (accreditation) {
        this.certifications.push(accreditation);
    };
    Employee.prototype.deleteCertification = function (accreditation) {
        var index = this.certifications.indexOf(accreditation);
        this.certifications.splice(index, 1);
    };
    Employee.prototype.addLicensure = function (accreditation) {
        this.licensures.push(accreditation);
    };
    Employee.prototype.deleteLicensure = function (accreditation) {
        var index = this.licensures.indexOf(accreditation);
        this.licensures.splice(index, 1);
    };
    Employee.prototype.addWorkHistory = function (workHistory) {
        this.workHistory.push(workHistory);
    };
    Employee.prototype.deleteWorkHistory = function (workHistory) {
        var index = this.workHistory.indexOf(workHistory);
        this.workHistory.splice(index, 1);
    };
    Employee.prototype.addChildrenInfo = function (familyBackground) {
        this.childrenInfo.push(familyBackground);
    };
    Employee.prototype.deleteChildrenInfo = function (familyBackground) {
        var index = this.childrenInfo.indexOf(familyBackground);
        this.childrenInfo.splice(index, 1);
    };
    Employee.prototype.addSiblingsInfo = function (familyBackground) {
        this.siblingsInfo.push(familyBackground);
    };
    Employee.prototype.deleteSiblingsInfo = function (familyBackground) {
        var index = this.siblingsInfo.indexOf(familyBackground);
        this.siblingsInfo.splice(index, 1);
    };
    Employee.prototype.hasPermanentAddress = function () {
        if (this.cityAddress.isPermanent) {
            this.permanentAddress = this.cityAddress;
            return true;
        }
        if (this.provincialAddress.isPermanent) {
            this.permanentAddress = this.provincialAddress;
            return true;
        }
        return false;
    };
    return Employee;
}());
exports.Employee = Employee;
;
//# sourceMappingURL=employee.js.map