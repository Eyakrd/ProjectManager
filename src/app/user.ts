import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class User {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}`)
      .pipe(map(users => users.length > 0));
  }
}
