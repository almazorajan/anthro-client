
import { Position } from './position';
import { EmploymentStatus } from './employment-status';
import { Address } from './address';
import { EducationHistory } from './education-history';
import { Accreditation } from './accrediation';
import { WorkHistory } from './work-history';
import { FamilyBackground } from './family-background'; 

export class Employee {

    _id: string;
    employeeNumber: string;
    startingDate: Date;
    salar: number;

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