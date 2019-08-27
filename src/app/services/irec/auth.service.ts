import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'access-token';
const TOKEN_CLIENT = 'client';
const TOKEN_UID = 'uid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  //apiAuthUrl = 'http://localhost:3000/auth/';
  apiAuthUrl = 'http://irec.institutototum.com.br/auth/';
  
  constructor(
    private http: HttpClient, 
    private storage:Storage,
    private platform: Platform
    ) {
      this.platform.ready().then(() => {
        this.checkToken();
      })
    
     }

     login(data): Observable<any> {

      return this.http.post<any>(this.apiAuthUrl + 'sign_in', data)
     }
    // login(data): Observable<any> {
     // let headers = new HttpHeaders();
      //return this.http.post<any>(this.apiAuthUrl + 'sign_in', data, {headers: headers})
      // .subscribe((res: Response) => {
      //   that.data = res.json().data;
      //   // console.log('Resposta');
      //   // console.log(that.currentUser);
      //   return that.data;
      // this.storage.set(TOKEN_KEY, 'Bearer 123456789').then(res => {
      //   this.authState.next(true);
      //   console.log(data);
       
      // })
    //}

     async logout() {
      const res = await this.storage.remove(TOKEN_KEY);
       this.authState.next(false);
    }

 // login(data): Observable<any>{

   //return this.http.post<any>(this.apiAuthUrl + 'sign_in', data)
  //}

  // logout (): Observable<any> {
  //   return this.http.get<any>(this.apiAuthUrl + 'sign_out')
  //     .pipe(
  //       tap(_ => this.log('logout')),
  //       catchError(this.handleError('logout', []))
  //     );
  // }

//   login(){
// return this.storage.set(TOKEN_KEY, 'Bearer 123456789').then(res => {
//   this.authenticationState.next(true);
// })
//   }
//   logout(){
// return this.storage.remove('token').then(res => {
//     this.authState.next(false);
//   console.log('Logado? ?? ' , this.isAuthenticated())
// })
//  }

  isAuthenticated(){
    return this.authState.value;
  }
  
  async getToken(){
    return this.storage.get(TOKEN_KEY)
  }

  async getClient(){
    return this.storage.get(TOKEN_CLIENT)
  }

  async getUid(){
    return this.storage.get(TOKEN_UID)
  }

  async checkToken(){
    const res = await this.storage.get(TOKEN_KEY);
    if (res) {
      this.authState.next(true);
      console.log('Logado? ?? ', this.isAuthenticated());
    }

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
    console.log('MEnsagem do Sistema: ', message);
  }





}
