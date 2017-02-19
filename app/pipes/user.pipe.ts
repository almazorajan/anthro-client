import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../models/model';

@Pipe({
    name: 'userFilter'
})

export class UserFilter implements PipeTransform {

    transform(users: User[], keyword: string): User[] {
        
        return users.filter(item => 
            item.userName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            || item.firstName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            || item.middleName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            || item.lastName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            || item.position.positionName.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
    
    }

}