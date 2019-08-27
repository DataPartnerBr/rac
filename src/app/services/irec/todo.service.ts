import { Injectable } from '@angular/core';
import { Todo } from '../../irec/todo/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/irec/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

//apiUrl = 'http://localhost:3000/api/v1/';
apiUrl = 'http://irec.institutototum.com.br/api/v1/';

  constructor(private http: HttpClient, private auth: AuthService) { }

getTodos(): Observable<Todo[]>{



  console.log(this.auth.getToken());
  console.log(this.auth.getClient());
  console.log(this.auth.getUid());

  let that = this;
  let headers = new HttpHeaders();
  headers.set('this.auth.getUid()', ''+ this.auth.getToken());
  headers.set('client', ''+this.auth.getClient());
  headers.set('uid', ''+ this.auth.getUid());

  return this.http.get<Todo[]>(this.apiUrl + 'todos', { headers })
  .pipe(
    tap(_ => this.log('Fetched To Dos')),
    catchError(this.handleError('getToDos', []))
  );
}

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
