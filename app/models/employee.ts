
import { 
    EmploymentStatus, 
    Address, 
    Education, 
    Accreditation, 
    WorkHistory, 
    Family,
    Position,
    ContactNumber,
    Company
} from './model';

export class Employee {
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

    constructor() {
        this.employeeNumber = "";
        this.startingDate = new Date();
        this.salary = 0;
        this.position = new Position();
        this.position._id = "";
        this.position.positionName = "";
        this.company = new Company();
        this.company._id = "";
        this.company.companyName = "";
        this.company.companyAddress = "";
        this.company.contactNumber = "";
        this.company.emailAddress = "";
        this.employmentStatus = new EmploymentStatus();
        this.employmentStatus._id = "";
        this.employmentStatus.employmentStatus = "";
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.birthDate = new Date();
        this.age = 0;
        this.birthPlace = "";
        this.phoneNumbers = [new ContactNumber()];
        this.landlines = [new ContactNumber()];
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
        this.educationHistory = [new Education()];
        this.certifications = [new Accreditation()];
        this.licensures = [new Accreditation()];
        this.workHistory = [new WorkHistory()];
        this.family = [new Family()];
    }
};