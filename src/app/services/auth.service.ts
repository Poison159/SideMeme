import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;
  temp: any;
  private url                   = 'https://samemes.conveyor.cloud/api/';
  private remoteUrl             = "https://192.168.0.112:45455/api/";  
  private _localRegisterUrl     = this.url + 'RegisterUser';
  private _localUserDataUrl     = this.url + 'UserData';
  private _localUserinfo        = this.url + 'Mylikes';
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private storage: Storage,
    private _http: HttpClient
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        storage.set('mm-user', JSON.stringify(this.userData));
      } else {
        storage.set('mm-user', null);
      }
    })
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  SignOut(){
    this.storage.clear();
    this.router.navigate(['landing']);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }
  //---------------------------Prev methods -------------------------------
  sever_RegisterUser(email): Observable<any> {
    console.log('Registering user on sever .....');
    return this._http.get<any>(this._localRegisterUrl + '?name=' + email + '&email=' + email);
  }

  getUserLikes(email:string) {
    console.log('fetching user info .....');
    return this._http.get<any>(this._localUserDataUrl + '?email=' + email);
  }

  getUserInfo(email : string){
    console.log('fetching user info .....');
    return this._http.get<any>(this._localUserinfo + '?email=' + email);
  }
  //--------------------------------------------------------------------------------------
  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      alert(error)
    })
  }  

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    this.ngFireAuth.authState.subscribe(user => {
      return (user !== null && user.emailVerified !== false) ? true : false;
    });
    return false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
      return (this.userData.emailVerified !== false) ? true : false;
    
  } 

}
