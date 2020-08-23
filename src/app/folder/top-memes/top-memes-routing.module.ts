import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopMemesPage } from './top-memes.page';

const routes: Routes = [
  {
    path: '',
    component: TopMemesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopMemesPageRoutingModule {}
