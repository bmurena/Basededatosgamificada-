import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonPopover,
  IonList,
  IonItem
} from '@ionic/angular/standalone';

import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonPopover,
    IonList,
    IonItem,
    CommonModule,
    FormsModule
  ]
})
export class InicioPage {

  usuario: string | null = null;
  menuUsuarioAbierto = false;

  constructor(private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.usuario = localStorage.getItem('usuario');
  }

  async abrirLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginPage
    });
    await modal.present();

    modal.onDidDismiss().then(() => {
      this.usuario = localStorage.getItem('usuario');
    });
  }

  abrirMenuUsuario() {
    this.menuUsuarioAbierto = true;
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.menuUsuarioAbierto = false;
  }
}
