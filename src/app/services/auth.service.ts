import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "../interfaces";

@Injectable({
    providedIn: 'root'
})


export class AuthService {

    constructor(
        private http: HttpClient) { }

    private auth_token = ''
    // host = "http://127.0.0.1:8000/"
    host = "http://192.168.10.251:8000/"

    login(user: User): Observable<{ auth_token: string }> {
        return this.http.post<{ auth_token: string }>
            (this.host + 'api/auth/token/login', user)
            .pipe(
                tap(
                    ({ auth_token }) => {
                        sessionStorage.setItem('auth-token', auth_token)
                        this.setToken(auth_token)
                    }
                )
            )
    }

    setToken(token: string) {
        this.auth_token = token
    }

    getToken(): string {
        return sessionStorage.getItem('auth-token') || ''
    }

    isAuthenticated(): boolean {
        return !!this.auth_token
    }

    logout(): Observable<any> {
        return this.http.post<any>
            (this.host + 'api/auth/token/logout', {})
            .pipe(
                tap(
                    () => {
                        this.setToken('')
                        sessionStorage.clear()
                    }
                )
            )
    }

}