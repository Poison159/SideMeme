import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { MemesService } from 'src/app/services/memes.service';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  comments: any[];
  id;
  email;
  private comment: string;
  constructor(navParams: NavParams,
              public modalController: ModalController,
              public toastController: ToastController,
              private memesService: MemesService) { }

  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  async send(id, comment: string){
    if (!comment) {
      const toast = await this.toastController.create({
        message: 'please add comment first',
        duration: 2000
      });
      toast.present();
      return;
    }
    this.memesService.addComment(id, comment, this.email).subscribe(
      () => {
        this.comments.push({memeId: id, comment:comment });
      },
      (err: any) => {},
      () => {
        this.comment = '';
      }
    );
  }
}
