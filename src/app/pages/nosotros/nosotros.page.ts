import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
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
    RouterModule
  ]
})
export class NosotrosPage {

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
