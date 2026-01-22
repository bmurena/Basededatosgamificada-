import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class JuegoPage {

  numeroCarta!: number;
  textoCarta = '';

  cartas: string[] = [
    'Entidad: representa un objeto del mundo real.',
    'Atributo: característica de una entidad.',
    'Clave primaria: identifica de forma única.',
    'Interrelación: conecta entidades.',
    'Cardinalidad: uno a uno.',
    'Cardinalidad: uno a muchos.',
    'Cardinalidad: muchos a muchos.',
    'Entidad débil: depende de otra.',
    'Modelo Entidad-Relación.',
    'Generalización.',
    'Especialización.',
    'Atributo compuesto.',
    'Atributo multivaluado.',
    'Dominio de un atributo.',
    'Integridad referencial.',
    'Normalización básica.',
    'Dependencia funcional.',
    'Diseño lógico de BD.'
  ];

  buscarCarta() {
    if (this.numeroCarta < 1 || this.numeroCarta > 18) {
      this.textoCarta = 'Ingresa un número válido entre 1 y 18.';
      return;
    }

    this.textoCarta = '🃏 ' + this.cartas[this.numeroCarta - 1];
  }
}
