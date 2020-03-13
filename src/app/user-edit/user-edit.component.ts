import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { User } from '../users-list/user.model';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../users-list/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) usForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedUserIndex: number;
  editedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedUserIndex = index;
          this.editMode = true;
          this.editedUser = this.userService.getUser(index);
          this.usForm.setValue({
            name: this.editedUser.name
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.name, new Date(), uuidv4());
    if (this.editMode) {
      this.userService.updateUser(this.editedUserIndex, newUser);
    } else {
      this.userService.addUser(newUser);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.usForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.userService.deleteUser(this.editedUserIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
