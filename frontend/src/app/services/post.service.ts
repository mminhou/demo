import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Post } from '../models/post';


@Injectable()
export class PostService {
  constructor(private http: Http) { }

  // pip install httpie
  // -> http GET http://127.0.0.1:8000/posts/
  getAll() {
    return this.http.get('http://127.0.0.1:8000/posts/', this.jwt()).map((response: Response) => response.json());
  }

  // -> http GET http://127.0.0.1:8000/posts/1/
  getById(id: number) {
    return this.http.get('http://127.0.0.1:8000/posts/' + id + '/', this.jwt()).map((response: Response) => response.json());
  }

  create(post: Post) {
    return this.http.post('http://127.0.0.1:8000/posts/', post, this.jwt()).map((response: Response) => response.json());
  }

  // -> http PUT http://127.0.0.1:8000/users/1/ username=... email=... password=...
  // update(user: User) {
  //     return this.http.put('/users/' + user.id + '/', user, this.jwt()).map((response: Response) => response.json());
  // }

  // -> http DELETE http://127.0.0.1:8000/posts/1/
  delete(id: number) {
    return this.http.delete('http://127.0.0.1:8000/po/' + id + '/', this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    // localStorage 에서 currentUser 불러오기
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      // request header에  Authorization 라는 이름으로 currentUser의 user id 보내기
      let headers = new Headers({ 'Authorization': JSON.stringify(currentUser.user.id) });
      return new RequestOptions({ headers: headers });
    }
  }


}
