import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //apiAuthUrl = 'http://localhost:3000/auth/';
  apiAuthUrl = 'http://irec.institutototum.com.br/auth/';

  constructor(private http: HttpClient) { }

  login(data): Observable<any>{
    return this.http.post<any>(this.apiAuthUrl + 'sign_in', data)
    .pipe(
      tap(_ => this.login('login'))
    );
  }

  logout (): Observable<any> {
    return this.http.get<any>(this.apiAuthUrl + 'sign_out')
      .pipe(
        tap(_ => this.log('logout')),
        catchError(this.handleError('logout', []))
      );
  }

  // register (data): Observable<any> {
  //   return this.http.post<any>(this.apiAuthUrl + 'sign_up', data)
  //     .pipe(
  //       tap(_ => this.log('login')),
  //       catchError(this.handleError('login', []))
  //     );
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }





}
