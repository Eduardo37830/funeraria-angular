import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-componente-entradamensaje',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  
  templateUrl: './componente-entradamensaje.component.html',
  styleUrl: './componente-entradamensaje.component.css'
})
export class ComponenteEntradamensajeComponent {
  socket: any;
  username: string = '';
  codigo: string = '';
  message: string = '';
  privateMessage: string = '';
  recipient: string = '';
  userToBlock: string = '';
  masterKey: string = '';

  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) { 
    

  }

  ngOnInit() {
    let datosChat = this.servicioSeguridad.ObtenerDatosChat();
    if (datosChat) {
      this.username = datosChat.usuario;
      this.codigo = datosChat.codigo;
    } else {
      alert('Los datos no son válidos');
      this.username = '';
      this.codigo = '';
      this.router.navigate(['/chat/chat']); // navigate to home page
    }
    if (this.username) {
      this.socket = io('http://localhost:3010');
      this.socket.emit('join', this.username, this.codigo);
      this.socket.emit('loadMessages', this.codigo);

      this.socket.on('message', (data: any) => {
        this.displayMessage(data);
      });

      this.socket.on('privateMessage', (data: any) => {
        this.displayPrivateMessage(data);
      });
    }
  }

  sendMessage() {
    if (this.recipient.trim() && this.message.trim()) {
      this.socket.emit('message', { message: this.message });
      this.message = '';
    }
  }

  sendPrivateMessage() {
    if (this.recipient.trim() && this.privateMessage.trim()) {
      this.socket.emit('privateMessage', { recipient: this.recipient, message: this.privateMessage });
      this.displayPrivateMessage({ user: 'You', recipient: this.recipient, message: this.privateMessage });
      this.privateMessage = '';
    }
  }

  blockUser() {
    if (this.userToBlock.trim() && this.masterKey.trim()) {
      this.socket.emit('blockUser', { userToBlock: this.userToBlock, masterKey: this.masterKey });
      this.userToBlock = '';
      this.masterKey = '';
    } else {
      alert('Please enter both the username to block and the master key.');
    }
  }

  displayMessage(data: any) {
    const messages = document.getElementById('messages');
    if (messages) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
      messages.appendChild(li);
    }
  }

  displayPrivateMessage(data: any) {
    const privateMessages = document.getElementById('privateMessages');
    if (privateMessages) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${data.user} to ${data.recipient}:</strong> ${data.message}`;
      privateMessages.appendChild(li);
    }
  }
}
