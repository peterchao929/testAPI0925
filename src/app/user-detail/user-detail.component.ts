import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})

export class UserDetailComponent {
  user: User | undefined;
  @ViewChild('userForm') form: NgForm | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUser();
  }

  // 呼叫Service 取得單一英雄資料
  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  // 呼叫Service 將變動的內容存進資料庫
  save(id: number): void {
    if (this.user){
      this.userService.updateUser(id, this.user).subscribe(() => this.goBack());
    }
  }

  // 返回上一頁
  goBack(): void {
    this.location.back();
  }
}
