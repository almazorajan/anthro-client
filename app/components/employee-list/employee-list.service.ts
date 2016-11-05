// /*
// version: 1
// Employee List Service
// **/

// // @angular
// import { Injectable } from '@angular/core';

// // user-defined models
// import { Search, Employee, Result } from '../../models/model';

// // user-defined service
// import { Service } from '../../shared-services/service';

// @Injectable() export class EmployeeListService extends Service {

//     addEmployee(company: Employee): Promise<Result> {

//         return this.apiCall("post", "employee/addemployee", company);

//     }

//     updateEmployee(company: Employee): Promise<Result> {

//         return this.apiCall("post", "employee/updateemployee", company);

//     }

//     deleteEmployee(company: Employee): Promise<Result> {

//         return this.apiCall("post", "employee/deleteemployee", company);

//     }

// }