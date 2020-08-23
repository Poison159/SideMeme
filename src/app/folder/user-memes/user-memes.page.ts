import { Component, OnInit } from '@angular/core';
import { IMeme } from 'src/app/Meme';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { MemesService } from 'src/app/services/memes.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-user-memes',
  templateUrl: './user-memes.page.html',
  styleUrls: ['./user-memes.page.scss'],
})
export class UserMemesPage implements OnInit {

  private email: string;
  private email2: string;
  private images: any[] = [];
  private temp: any[];
  private likes = new Array<number>();
  private image: IMeme;

  constructor(private userService: AuthenticationService,
               private route: ActivatedRoute,
               private router: Router,
               private loadingController: LoadingController,
               private toastController: ToastController,
               private storage: Storage,
               private memesService: MemesService) {

                this.route.queryParams.subscribe(params => {
                  if (params.email) {
                    this.email = JSON.parse(params.email);
                  }
                });

              }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Fetching user memes...',
      duration: 5000
    });
    this.populateUserLikes(loading);
    loading.present();
    this.userService.getUserInfo(this.email).subscribe(res => {
      this.temp = res;
      this.temp.forEach(obj => {
        obj.meme.forEach(meme => {
          this.images.push(meme);
        });
      });
      loading.dismiss();
    }, async error => {
      console.error(error)
      loading.dismiss();
    },() => {
      loading.dismiss();
    });
  }

  populateUserLikes(loading: HTMLIonLoadingElement){
    this.storage.get('mm-user').then(res => {
      let temp = JSON.parse(res);
      this.email2 = temp.email;
      this.userService.getUserLikes(this.email2)
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

}
