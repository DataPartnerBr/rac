import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../../services/irec/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 submitted = false;
 loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    public toastController: ToastController,
    public storage:  Storage
  ) { }

  ngOnInit() {
    this.auth.authState.subscribe(state => {
      console.log('Auth Status: ', state);
      if(state){
        this.router.navigate(['irec/dashboard']);
      }else{
        this.router.navigate(['irec/login']);
      }
    })
    
    
    this.loginForm = this.formBuilder.group({
    'email' : [null, [Validators.required, Validators.email]],
    'password' : [null, [Validators.required, Validators.minLength(6)]]
  });

  
}



onFormSubmit(form: NgForm) {

  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
    }else{
      this.auth.login(form).subscribe(res => {
        if (res) {
         // this.auth.get();
          this.presentToast('Login Success!');
          this.router.navigate(['irec/dashboard']);
          //this.authState.next(true);
        }
      })

  // this.auth.login(form)
  //   .subscribe(res => {
  //     if (res) {
  //       this.storage.set('token', res);
  //       console.log('passei pelo response - token');
  //       console.log(res);
  //       console.log(res.token);
  //       this.router.navigateByUrl(('/dashboard'));
  //     }

  //   }, (err) => {
  //     console.log(err);
  //   });
}

}


clear() {
  this.storage.clear().then(() => {
    console.log('Formulário limpo!');
    this.router.navigate(['irec/login']);
    
  });
}

async presentToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

get frm() { return this.loginForm.controls; }  

}
