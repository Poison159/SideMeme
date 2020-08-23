import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMemesPage } from './user-memes.page';

const routes: Routes = [
  {
    path: '',
    component: UserMemesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMemesPageRoutingModule {}
