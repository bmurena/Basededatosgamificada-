import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonPopover,
  IonList,
  IonItem
} from '@ionic/angular/standalone';

import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-aprende',
  templateUrl: './aprende.page.html',
  styleUrls: ['./aprende.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonPopover,
    IonList,
    IonItem,
    CommonModule
  ]
})
export class AprendePage {

  nivelSeleccionado: number | null = null;

  usuario: string | null = null;
  menuUsuarioAbierto = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.usuario = localStorage.getItem('usuario');
  }

  seleccionarNivel(nivel: number) {
    this.nivelSeleccionado =
      this.nivelSeleccionado === nivel ? null : nivel;
  }

  irAPractica() {
    this.router.navigate(['/practica'], {
      queryParams: { nivel: this.nivelSeleccionado }
    });
  }

  /** 🔐 LOGIN */
  async abrirLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      cssClass: 'login-modal'
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
