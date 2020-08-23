import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserMemesPageRoutingModule } from './user-memes-routing.module';

import { UserMemesPage } from './user-memes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserMemesPageRoutingModule
  ],
  declarations: [UserMemesPage]
})
export class UserMemesPageModule {}
