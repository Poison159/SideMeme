import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ServerUser } from '../sever_user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  private userName: string;
  private email: string;
  private password: string;
  private confirmPassword: string;
  private severUser = new ServerUser();
  
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public storage: Storage
  ) { }

  ngOnInit() {
  }

  signUp(){
    this.authService.RegisterUser(this.email, this.password)      
    .then((res) => {
      this.authService.SendVerificationMail();
      this.saverUSerReg(res.user);
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  saverUSerReg(firebaseUSer: any){
    this.authService.sever_RegisterUser(this.email)
    .subscribe(res => {
      this.severUser.id = res.id;
      this.severUser.email = this.email;
      this.severUser.displayName = this.email.split('@')[0];
      this.severUser.emailVerified = firebaseUSer.emailVerified;
      this.severUser.uid = firebaseUSer.uid;
      this.severUser.photoURL = firebaseUSer.photoURL;
      this.storage.set("mm-user",this.severUser);
    },(error:any)=> {

    },() => {});
  }

}
