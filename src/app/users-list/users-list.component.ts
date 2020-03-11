import { Component, OnInit } from '@angular/core';
import {User} from './user.model';
import {v4 as uuidv4} from 'uuid';
import { UserService } from './user.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [UserService]
})
export class UsersListComponent implements OnInit {
users: User[];

userAdditing() {

}
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

}
