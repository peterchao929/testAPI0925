import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService
  ) {}

  // 初始化時，自動抓取Userdata
  ngOnInit(): void {
    this.getUsers();
  }

  // 呼叫服務 getUsers方法並訂閱使用
  getUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
  }
}
