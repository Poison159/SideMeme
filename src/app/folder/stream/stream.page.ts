import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, ModalController, IonSlides } from '@ionic/angular';
import { MemesService } from 'src/app/services/memes.service';
import { IMeme } from 'src/app/Meme';
import {formatDate } from '@angular/common';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { LikeModalPage } from '../like-modal/like-modal.page';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.page.html',
  styleUrls: ['./stream.page.scss'],
})
export class StreamPage implements OnInit {
  @ViewChild(IonSlides, null) slides: IonSlides;
  private email: string;
  private images: IMeme[];
  private image: IMeme;
  private comment: string;
  private likes = new Array<number>();
  private temp: any;
  private user: any;
  constructor(
    private memesService: MemesService,
    private userService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController, 
    public toastController: ToastController, 
    public modalController: ModalController,
    private storage: Storage,
    public route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe(params => {
      if (params && params.temp) {
        this.temp = JSON.parse(params.temp);
      }
    });
  }
  // Check route params for temp
  async ngOnInit() {
    console.log('Fetching from service...');
    const loading = await this.loadingController.create({
      message: 'Fetching Memes ...'
    });
    this.populateUserLikes(loading);
    loading.present();
    this.memesService.getMemes()
    .subscribe(
        async (data: IMeme[]) => {
          this.images = data;
          this.images.forEach(image => {
            image.comments.forEach(comm => {
              comm.time = formatDate(comm.time, 'yyyy-MM-dd hh:mm', 'en-US');
            });
          });
          await this.delay(2000);
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

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  populateUserLikes(loading: HTMLIonLoadingElement){
    let tempUser = null;
    this.storage.get('mm-user').then(res => {
      if(!this.temp){
        tempUser = JSON.parse(res);
        this.email = tempUser.email;
      }else{
        this.email = this.temp.email;
      }
      
      
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
      (res:any) => {
        res.time = formatDate(res.time, 'yyyy-MM-dd hh:mm', 'en-US');
        this.image =  this.images.find(x => x.id === id);
        this.image.comments.push(res);
      },
      (err: any) => {},
      () => {
       this.comment = '';
      }
    );
  }

  async like(id: number){
    if(!this.likes.includes(id)){
      this.memesService.addLike(id, this.email)
      .subscribe((res) => {
        this.likes.push(id);
        let image = this.images.find(x => x.id === id);
        image.likes.push(res);
      }, (error) => {
        alert("coud not add like");
      });
    }else{
      this.memesService.addLike(id, this.email)
      .subscribe(() => {
        this.likes = this.likes.filter(x => x !== id);
        let image = this.images.find(x => x.id === id);
        image.likes = image.likes.filter(x => x.email !== this.email);
      }, (error) => {
        alert("coud not add like");
      });
    }
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

  async openLikes(likes: any[]){
    const modal = await this.modalController.create({
      component: LikeModalPage,
      componentProps: {
        likes: likes
      }
    });
    return await modal.present();
  }

  async getRandMemes(){
    console.log('Fetching from service...');
    const loading = await this.loadingController.create({
      message: 'Fetching Random Memes ...'
    });
    loading.present();
    this.memesService.getRandMems()
    .subscribe(
        (data: IMeme[]) => {
          this.images = data;
          this.images.forEach(image => {
            image.comments.forEach(comm => {
              comm.time = formatDate(comm.time, 'yyyy-MM-dd hh:mm', 'en-US');
            });
          });
          loading.dismiss();
        },
        (err: any) => {
          console.log(err);
          loading.dismiss();
        },
        () => {
          console.log('All done getting Memes');
          loading.dismiss();
        }
    );
  }

  logOut(){
    this.storage.clear();
    this.router.navigate(['register']);
  }

  doRefresh(event) {
    this.slides.slideTo(0,200);
    this.memesService.getMemes()
    .subscribe(
        (data: IMeme[]) => {
          this.images = data;
          this.images.forEach(image => {
            image.comments.forEach(comm => {
              comm.time = formatDate(comm.time, 'yyyy-MM-dd hh:mm', 'en-US');
            })
          });
        },
        (err: any) => {
          console.log(err);
        },
        () => {
          console.log('All done getting Memes');
        }
    );
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
