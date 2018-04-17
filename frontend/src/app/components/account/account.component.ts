import { Component, OnInit } from '@angular/core';


@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})

export class AccountComponent implements OnInit{
  currentUser: any = {};

  changeAccount = false;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  ChangeAccount() {
    this.changeAccount = true;
  }
  back() {
    this.changeAccount = false;
  }
}
