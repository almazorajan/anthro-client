import { User } from './models';

export class Session {
    token: string;
    user: User;
}