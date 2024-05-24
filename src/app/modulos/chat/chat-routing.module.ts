import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponenteChatComponent } from './componente-chat/componente-chat.component';
import { ComponenteEntradamensajeComponent } from './componente-entradamensaje/componente-entradamensaje.component';
import { ComponenteListachatComponent } from './componente-listachat/componente-listachat.component';
import { ComponenteListamensajeComponent } from './componente-listamensaje/componente-listamensaje.component';
import { ComponentePrivadomensajeComponent } from './componente-privadomensaje/componente-privadomensaje.component';


const routes: Routes = [
  {
    path: "chat",
    component: ComponenteChatComponent
  },
  {
    path: "entradamensaje",
    component: ComponenteEntradamensajeComponent
  },
  {
    path: "listachat",
    component: ComponenteListachatComponent
  },
  {
    path: "listamensaje",
    component: ComponenteListamensajeComponent
  },
  {
    path: "privadomensaje",
    component: ComponentePrivadomensajeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
