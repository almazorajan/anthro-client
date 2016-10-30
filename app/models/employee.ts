
import { EmploymentStatus, 
    Address, 
    EducationHistory, 
    Accreditation, 
    WorkHistory, 
    FamilyBackground,
    Position 
} from './model';

export class Employee {

    _id: string;
    employeeNumber: string;
    startingDate: Date;
    salary: number;

    position: Position;
    employmentStatus: EmploymentStatus;

    firstName: string;
    middleName: string;
    lastName: string;

    birthDate: Date;
    age: number;
    birthPlace: string;

    phoneNumbers: string[];
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

    educationHistory: EducationHistory[];

    certifications: Accreditation[];
    licensures: Accreditation[];

    workHistory: WorkHistory[];

    fathersInfo: FamilyBackground;
    mothersInfo: FamilyBackground;
    spouseInfo: FamilyBackground;
    childrenInfo: FamilyBackground[];
    siblingsInfo: FamilyBackground[];

};