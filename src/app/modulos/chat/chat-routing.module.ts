import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chat',
    loadChildren: () => import('./chat.module').then(m => m.ChatModule)
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./chat.module').then(m => m.ChatModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
