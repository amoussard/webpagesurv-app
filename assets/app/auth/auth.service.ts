import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {}

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post('http://localhost:3000/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post('http://localhost:3000/user/signin', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}