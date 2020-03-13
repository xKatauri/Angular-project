import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [UserService]
})
export class UsersListComponent implements OnInit {
  users: User[];
  private subscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.subscription = this.userService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      )
  }

  onEditUser(index: number) {
    this.userService.startedEditing.next(index);
  }

}
