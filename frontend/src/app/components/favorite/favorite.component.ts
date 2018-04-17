import {Component, OnInit } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Router} from '@angular/router';
import {PostService} from "../../services/post.service";
import 'rxjs/add/operator/toPromise';


@Component({
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {

  currentUser: any = [];

  post: any = [];
  results: any;



  constructor(private postService: PostService, private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  select(id) {
    console.log(this.http.get('http://127.0.0.1:8000/posts/' + id + '/').toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise))
    return this.http.get('http://127.0.0.1:8000/posts/' + id + '/').map((response: Response) => response.json())
  }



}

