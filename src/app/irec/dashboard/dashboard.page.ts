import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/irec/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router,
    public storage:  Storage,
    public auth: AuthService
    ) { }

  ngOnInit() {
    var testes = this.storage.get("access-token");
    console.log(testes);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['irec/login']);
  }

  

  //   this.authService.logout()
  //     .subscribe(res => {
  //       console.log(res);
  //       this.storage.remove('token');
  //       this.router.navigate(['login']);
  //     });
  //     this.clear();
  // }

  clear() {
    this.storage.clear().then(() => {
      console.log('Local Storage Clean!');
    });
  }
  
  gotoTodo(){
    this.router.navigate(['irec/todo']);
}

}
