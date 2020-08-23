import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopMemesPageRoutingModule } from './top-memes-routing.module';

import { TopMemesPage } from './top-memes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopMemesPageRoutingModule
  ],
  declarations: [TopMemesPage]
})
export class TopMemesPageModule {}
