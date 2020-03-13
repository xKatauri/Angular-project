import { User } from './user.model'
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';

export class UserService {
  usersChanged = new Subject<User[]>();
  startedEditing = new Subject<number>();
  private users: User[] = [
    new User('John', new Date(), uuidv4()),
    new User('Pete', new Date(), uuidv4())
  ];

  getUsers() {
    return this.users.slice();
  }

  getUser(index: number) {
    return this.users[index];
  }
  addUser(user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice())
  }
  addUsers(users: User[]) {
    this.users.push(...users);
    this.usersChanged.next(this.users.slice());
  }
  updateUser(index: number, newUser: User) {
    this.users[index] = newUser;
    this.usersChanged.next(this.users.slice())
  }
  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
  }

}