import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-like-modal',
  templateUrl: './like-modal.page.html',
  styleUrls: ['./like-modal.page.scss'],
})
export class LikeModalPage implements OnInit {

  likes;
  constructor(public modalController: ModalController,
            private storage: Storage,
            private router: Router) { }

  ngOnInit() {
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  seeLikes(email){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          email: JSON.stringify(email)
        }
      };
      this.dismiss();
      this.router.navigate(['folder/user-memes/user-memes'],navigationExtras);
  }

}
