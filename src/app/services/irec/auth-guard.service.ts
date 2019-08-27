import { Injectable } from '@angular/core';
import { AuthService } from '../irec/auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
     private auth: AuthService,
     private router: Router,
     private alertController: AlertController
     ) { }

    canActivate():boolean {
      if(this.auth.isAuthenticated()){
        return this.auth.isAuthenticated();
      }else{
        this.router.navigate(['irec', 'login']);
      }

      
    }

  // canActivate(route: ActivatedRouteSnapshot) {
  //   const expectedRole = route.data.role;

  //   return this.auth.user.pipe(
  //     take(1),
  //     map(user =>{
  //       if(!user) {
  //         this.showAlert();
  //         return this.router.parseUrl('/login')
  //       } else {
  //         let role = user['role'];

  //         if(expectedRole == role){
  //           return true;
  //         } else {
  //           this.showAlert();
  //           return this.router.parseUrl('/login');
  //         }
  //       }
  //     })
  //   )
  // }

  async showAlert(){
    let alert = await this.alertController.create({
      header: 'Unauthorized',
      message: 'You are not authorized to visit that page!',
      buttons: ['OK']
    });
    alert.present();
  }
}
