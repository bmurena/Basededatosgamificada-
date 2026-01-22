import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
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
    CommonModule,
    FormsModule,
    IonButton
  ]
})
export class InicioPage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  async abrirLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginPage
    });
    await modal.present();
  }

  ngOnInit() {}
}
