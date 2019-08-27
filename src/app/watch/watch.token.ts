import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
    HttpHeaders
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { Router } from '@angular/router';
  import { ToastController } from '@ionic/angular';
  import { Injectable } from '@angular/core';
  import { Storage } from '@ionic/storage';

  @Injectable()
  export class TokenInterceptor implements HttpInterceptor{

    constructor(
        private router: Router,
        private storage: Storage,
        public toastController: ToastController
        ){}


        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            
            const token = this.storage.get('access-token');
            const client = this.storage.get('client');
            const uid = this.storage.get('uid');
            
            if(token){
                console.log('from watch: ', token + ' '+ client + ' '+ uid );
                request = request.clone({
                    setHeaders: {
                        'access-token': ''+ token,
                        'client' : ''+ client,
                        'uid' : ''+ uid


                    }
                });
            }

            if(!request.headers.has('Content-Type')){
                request = request.clone({
                    setHeaders: {
                        'content-type': 'application/json',
                        observe: 'response'
                    }
                });
            }
            
            request = request.clone({
                headers: request.headers.set('Accept', 'application/json')
                
            });



            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if(event instanceof HttpResponse){ 
                        console.log('Resposta API-->', event);
                
                        this.storage.set('access-token', event.headers.get("access-token"));
                        this.storage.set('client', event.headers.get("client"));
                        this.storage.set('uid', event.headers.get("uid"));    
                    }
                    
                    return event;
                }),
                catchError((error: HttpErrorResponse) =>{
                    if (error.status === 401) {
                        if (error.error.success === false) {
                          this.presentToast('Email e senha inválido');
                        }
                      }
                      return throwError(error);
                    })
            );
        } // END INTERCEPT
       

        async presentToast(msg) {
            const toast = await this.toastController.create({
              message: msg,
              duration: 2000,
              position: 'top'
            });
            toast.present();
          }

  }