import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/user';


@Injectable()
export class UserService {
    constructor(private http: Http) { }

    // pip install httpie
    // -> http GET http://127.0.0.1:8000/users/
    getAll() {
        return this.http.get('http://127.0.0.1:8000/users/', this.jwt()).map((response: Response) => response.json());
    }

    // -> http GET http://127.0.0.1:8000/users/1/
    getById(id: number) {
        return this.http.get('http://127.0.0.1:8000/users/' + id + '/', this.jwt()).map((response: Response) => response.json());
    }

    // -> http POST http://127.0.0.1:8000/users/ username=... email=... password=...
    create(user: User) {
        return this.http.post('http://127.0.0.1:8000/users/', user, this.jwt()).map((response: Response) => response.json());
    }

    // -> http PUT http://127.0.0.1:8000/users/1/ username=... email=... password=...
    // update(user: User) {
    //     return this.http.put('/users/' + user.id + '/', user, this.jwt()).map((response: Response) => response.json());
    // }

    // -> http DELETE http://127.0.0.1:8000/users/1/
    delete(id: number) {
        return this.http.delete('http://127.0.0.1:8000/users/' + id + '/', this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            let body = currentUser;
            return new RequestOptions({ body, headers: headers });
        }
    }
}
