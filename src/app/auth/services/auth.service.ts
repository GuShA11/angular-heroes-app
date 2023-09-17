import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, map, of, tap, catchError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser(): User | undefined {
        if (!this.user) return undefined
        return structuredClone(this.user)
    }

    login(email: string, password: string): Observable<User> {
        //http.post('login',{email, password})
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                tap(user => localStorage.setItem('token', 'ASa2adsa873.2jakhbsdaHG.JAsajk1')),
            );
    }

    checkAuthentication(): Observable<boolean> {

        if (!localStorage.getItem('token')) return of(false);

        const token = localStorage.getItem('token');

        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                map(user => !!user),
                catchError(err => of(false)),
            );
    }

    logOut() {
        this.user = undefined
        localStorage.clear()
    }


}