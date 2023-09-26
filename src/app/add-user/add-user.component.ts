import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user!: User;
  @ViewChild('userForm') form: NgForm | undefined;

  constructor(
    private userService: UserService
  ){}

  add(): void {
    this.user.firstname = this.user.firstname.trim();
    this.user.lastname = this.user.lastname.trim();

    if(!this.user) { return; }
    this.userService.addUser(this.user).subscribe();
  }
}
