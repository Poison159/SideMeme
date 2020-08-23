import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'stream',
    loadChildren: () => import('./stream/stream.module').then( m => m.StreamPageModule)
  },
  {
    path: 'modal-page',
    loadChildren: () => import('./modal-page/modal-page.module').then( m => m.ModalPagePageModule)
  },
  {
    path: 'like-modal',
    loadChildren: () => import('./like-modal/like-modal.module').then( m => m.LikeModalPageModule)
  },
  {
    path: 'user-memes',
    loadChildren: () => import('./user-memes/user-memes.module').then( m => m.UserMemesPageModule)
  },
  {
    path: 'top-memes',
    loadChildren: () => import('./top-memes/top-memes.module').then( m => m.TopMemesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
