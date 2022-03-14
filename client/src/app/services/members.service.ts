import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("user")).token
      }
    )
  }

  constructor(private httpService: HttpClient) { }

  getMembers(): Observable<Member[]> { 
    return this.httpService.get<Member[]>(this.baseUrl + 'users', this.httpOptions);
  }

  getMember(username: string): Observable<Member> {
    return this.httpService.get<Member>(this.baseUrl + `users/${username}`, this.httpOptions);
  }

}
