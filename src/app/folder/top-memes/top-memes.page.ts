import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { IMeme } from 'src/app/Meme';
import { MemesService } from 'src/app/services/memes.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { LikeModalPage } from '../like-modal/like-modal.page';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-top-memes',
  templateUrl: './top-memes.page.html',
  styleUrls: ['./top-memes.page.scss'],
})
export class TopMemesPage implements OnInit {
  @ViewChild(IonSlides, null) slides: IonSlides;
  private things: any[] = [];
  private i = 0;
  private likes = new Array<number>();
  private images = new  Array<any>();
  private image: IMeme; 
  private email: string;
  private comment: string;
  private span:string;
  constructor(
    private memesService: MemesService,
    private loadingController: LoadingController,
    private storage: Storage,
    public modalController: ModalController,
    public toastController: ToastController,
    private userService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.storage.get('mm-user').then(res => {
      this.email = res.email;
    });
    this.getMemes();
  }

  async doRefresh(event){
    setTimeout(() => {
      this.getMemes();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  populateUserLikes(loading: HTMLIonLoadingElement){
    this.storage.get('mm-user').then(res => {
      let temp = JSON.parse(res);
      this.email = temp.email;
      this.userService.getUserLikes(this.email)
      .subscribe(
        (data) => this.likes = data,
        (err: any) => {
          console.log(err);
          loading.dismiss();
        },
        () => {
          console.log('All done geting likes');
          loading.dismiss();
        }
      );
    });
  }

  ChangeIndex(){
    this.slides.slideTo(0,200)
    if(this.i < this.things.length -1){
        this.i = this.i + 1;
        this.span = this.things[this.i].span;
    }else{
      this.i = 0;
      this.span = this.things[this.i].span;
    }
  }

  async getMemes(){
    console.log('Fetching from service...');
    const loading = await this.loadingController.create({
      message: 'Fetching Memes...'
    });
    this.populateUserLikes(loading);
    loading.present();
    this.memesService.getMostLikedMemes()
    .subscribe(
        (data: any) => {
          this.things = data;
          this.span = data[this.i].span;
            this.things.forEach(thing => {
              thing.meme.forEach(img => {
                this.images.push(img);
                img.comments.forEach(comm => {
                  comm.time = formatDate(comm.time, 'yyyy-MM-dd hh:mm', 'en-US');
                });
              });
            });
          loading.dismiss();
        },
        (err: any) => {
          console.log(err);
          loading.dismiss();
        },
        () => {
          console.log('All done geting Memes');
          loading.dismiss();
        }
    );
  }

  async like(id: number){
    if(!this.likes.includes(id)){
      this.memesService.addLike(id, this.email)
      .subscribe(() => {
        this.likes.push(id);
        let image = this.images.find(x => x.id === id);
        image.likes.push(this.email);
      }, (error) => {
        alert("coud not add like");
      })
    }else{
      this.memesService.addLike(id, this.email)
      .subscribe(() => {
        this.likes = this.likes.filter(x => x !== id);
        let image = this.images.find(x => x.id === id);
        this.images[this.images.indexOf(image)].likes = this.image.likes.filter(x => x === this.email);
      }, (error) => {
        alert("coud not add like");
      });
    }
  }
  async openLikes(likes: any[]){
    const modal = await this.modalController.create({
      component: LikeModalPage,
      componentProps: {
        likes: likes
      }
    });
    return await modal.present();
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
    this.memesService.addComment(id, comment,this.email).subscribe(
      () => {
        this.image =  this.images.find(x => x.id === id);
        this.image.comments.push({memeId: id, comment: comment, email: this.email});
      },
      (err: any) => {},
      () => {
       this.comment = '';
      }
    );
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {
        id: id,
        email: this.email,
        comments: this.images.find( x => x.id === id).comments,
      }
    });
    return await modal.present();
  }

}
