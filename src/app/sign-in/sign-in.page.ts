import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ServerUser } from '../sever_user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  private email: string;
  private password: string;
  private user: any;
  
  
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private storage : Storage
  ) {}

  ngOnInit() {}

  logIn() {
    this.authService.SignIn(this.email, this.password)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.storage.set("mm-user",res.user);
          const navigationExtras: NavigationExtras = {
            queryParams: {
              temp: JSON.stringify(res.user)
            }
          };
          this.router.navigate(['folder/stream/stream'],navigationExtras);          
        } else {
          window.alert('Email is not verified')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  gotoReset(){
    this.router.navigate(['reset-password']);
  }

  

}
