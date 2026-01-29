import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  ModalController,
  // Componentes necesarios para la "cajita" (Popover)
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';

import { LoginPage } from '../login/login.page';

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
    RouterModule,

  ]
})
export class JuegoPage {
abrirMenuUsuario() {
throw new Error('Method not implemented.');
}

  // VARIABLES
  numeroCarta!: number;
  textoCarta = '';
  mensajeError = '';
  cartaMostrada = false;
  usuario: string | null = null;
  
  // Base de datos de cartas
  cartas: string[] = [
    "Respuesta correcta: b) Es una colección de información estructurada que permite el almacenamiento, consulta y gestión eficiente de los datos.",
    'Respuesta correcta: c) Es un campo (o grupo de campos) que identifica de forma exclusiva e irrepetible a una fila en una tabla. ',
    'Respuesta correcta: b) Se da cuando un registro de la Entidad A puede estar vinculado con varios de la Entidad B.',
    'Respuesta correcta: c) Es una estructura de datos física que mejora la velocidad de las operaciones de consulta, similar al índice de un libro.',
    'Respuesta correcta: b) Define las propiedades de un objeto o concepto.',
    'Respuesta correcta: b) Ambos lados de la relación pueden tener múltiples asociaciones.',
    'Respuesta correcta: b) En la notación estándar de Chen, los rectángulos son entidades, los elipses atributos y los rombos relaciones.',
    'Respuesta correcta: c) Cada elemento de la Entidad A corresponde estrictamente a uno de la Entidad B.',
    'Respuesta correcta: b) Es un modelo conceptual que define qué datos se guardan y cómo se conectan entre sí, antes de pasar al diseño físico.',
    'Respuesta correcta: c) Es otra forma de notar la relación de muchos a muchos.',
    'Respuesta correcta: a) Es un proceso de abstracción donde se identifican subgrupos especializados de una entidad más general.',
    'Respuesta correcta: a) Representa la forma en que las entidades interactúan o se asocian dentro del sistema.',
    'Respuesta correcta: b) La falta de normalización causa repetición innecesaria de datos y problemas al insertar, borrar o actualizar información.',
    'Respuesta correcta: b) Se hace a veces por rendimiento para evitar "Joins" complejos, sacrificando espacio y limpieza por velocidad de lectura.',
    'Respuesta correcta: c) Es sinónimo de clave primaria o candidato; su valor permite distinguir un registro de todos los demás.',
    'Respuesta correcta: b) Es un atributo que tiene componentes internos.',
    'Respuesta correcta: b) También llamado atómico; es el nivel más básico de información que no tiene sentido descomponer.',
    'Respuesta correcta: c) Indica el número de ocurrencias de una entidad que pueden estar asociadas a una ocurrencia de otra entidad.'
  ];

  constructor(private modalCtrl: ModalController) {
    // Registramos los iconos que usaremos
    addIcons({ logOutOutline, personCircleOutline });
  }

  /**
   * Se ejecuta al entrar a la página: recupera la sesión
   */
  ionViewWillEnter() {
    this.usuario = localStorage.getItem('usuario');
  }

  // --- JUEGO ---
  buscarCarta() {
    this.mensajeError = '';
    if (!this.numeroCarta || this.numeroCarta < 1 || this.numeroCarta > 18) {
      this.mensajeError = 'Ingresa un número válido del 1 al 18.';
      this.cartaMostrada = false;
      return;
    }
    this.textoCarta = this.cartas[this.numeroCarta - 1];
    this.cartaMostrada = true;
  }

  // --- LOGIN ---
  async abrirLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      cssClass: 'login-modal'
    });
    
    await modal.present();

    // Al cerrar el login, actualizamos la variable usuario
    await modal.onDidDismiss();
    this.usuario = localStorage.getItem('usuario');
  }

  // --- CERRAR SESIÓN ---
  // Esta función será llamada desde el botón dentro del Popover
  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    // Nota: El popover se cierra automáticamente al hacer click si usamos la estructura HTML correcta
  }
}