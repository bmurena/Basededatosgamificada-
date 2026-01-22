import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

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
  CommonModule
]

})
export class AprendePage {
  nivelSeleccionado: number | null = null;

  constructor(private router: Router) {}

  seleccionarNivel(nivel: number) {
    this.nivelSeleccionado =
      this.nivelSeleccionado === nivel ? null : nivel;
  }

  irAPractica() {
    this.router.navigate(['/practica'], {
      queryParams: { nivel: this.nivelSeleccionado }
    });
  }
}

