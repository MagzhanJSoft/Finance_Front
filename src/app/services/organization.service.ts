import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { listOrg } from "../interfaces";

@Injectable({
    providedIn: 'root'
})


export class OrganizationsService {
    constructor(private http: HttpClient) {
    }
    // host = "http://127.0.0.1:8000"
    host = "http://192.168.10.251:8000/"


    fetch(params: any): Observable<listOrg> {
        return this.http.get<listOrg>(this.host + '/api/orglist', { params })
    }
}