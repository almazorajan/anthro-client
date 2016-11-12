import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../models/model';

@Pipe({
    name: 'userFilter'
})

export class UserFilter implements PipeTransform {

    transform(users: User[], keyword: string): User[] {
        
        return users.filter(item => 
            item.userName.indexOf(keyword) > -1
            || item.firstName.indexOf(keyword) > -1
            || item.middleName.indexOf(keyword) > -1
            || item.lastName.indexOf(keyword) > -1
            || item.position.positionName.indexOf(keyword) > -1);
    
    }

}