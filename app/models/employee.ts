import { EmploymentStatus, Address, Education, Accreditation, WorkHistory, Family,Position,ContactNumber, Company } from './models';

export class Employee {

    constructor() {
        this._id = "";
        this.employeeNumber = "";
        this.startingDate = new Date();
        this.salary = 0;
        this.position = new Position();
        this.company = new Company();
        this.employmentStatus = new EmploymentStatus();
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
        this.cityAddress = new Address();
        this.provincialAddress = new Address();
        this.permanentAddress = new Address();
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

    _id: string;
    image: string;
    employeeNumber: string;
    startingDate: Date;
    salary: number;
    position: Position;
    company: Company;
    employmentStatus: EmploymentStatus;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: Date;
    age: number;
    birthPlace: string;
    phoneNumbers: ContactNumber[];
    landlines: ContactNumber[];
    maritalStatus: string;
    gender: string;
    citizenship: string;
    cityAddress: Address;
    provincialAddress: Address;
    permanentAddress: Address;
    ssNumber: string;
    tinNumber: string;
    philHealthNumber: string;
    pagibigNumber: string;
    educationHistory: Education[];
    certifications: Accreditation[];
    licensures: Accreditation[];
    workHistory: WorkHistory[];
    family: Family[];
};