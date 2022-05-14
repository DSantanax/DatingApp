import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl: string = environment.apiUrl;
  members: Member[] = [];

  constructor(private httpService: HttpClient) { }

  getMembers(): Observable<Member[]> {
    if(this.members.length > 0) {
      return of(this.members);
    }
    return this.httpService.get<Member[]>(this.baseUrl + 'users').pipe(
      map((members) => {
        this.members  = members;
        return members;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find((member) => member.username === username);
    if(member !== undefined) {
      return of(member);
    }
    return this.httpService.get<Member>(this.baseUrl + `users/${username}`);
  }

  updateMember(memberUpdate: Member): Observable<void> {

    return this.httpService.put(this.baseUrl + `users`, memberUpdate).pipe(
      map(() => {
        const index = this.members.indexOf(memberUpdate);
        this.members[index] = memberUpdate;
      })
    );
  }

}
