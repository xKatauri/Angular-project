import {User} from './user.model'
import {v4 as uuidv4} from 'uuid';

export class UserService {
 private users: User[] = [
    new User('John', new Date(), uuidv4()),
    new User('Pete', new Date(), uuidv4())
    ];

    getUsers() {
      return this.users.slice();
    }
}