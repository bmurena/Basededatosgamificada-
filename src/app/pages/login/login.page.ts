import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  AlertController,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonItem,
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonItem,
    IonInput,
    CommonModule,
    FormsModule
  ]
})
export class LoginPage implements OnInit {

  modo: 'login' | 'registro' = 'login';

  // LOGIN
  usuario: string = '';
  password: string = '';

  // REGISTRO
  nombre: string = '';
  email: string = '';
  passwordReg: string = '';
  confirmar: string = '';

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  cambiarModo(m: 'login' | 'registro') {
    this.modo = m;
  }

  async mostrarMensaje(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  iniciarSesion() {
    if (!this.usuario || !this.password) {
      this.mostrarMensaje('Campos incompletos', 'Ingresa usuario y contraseña');
      return;
    }

    // 🔴 SIMULACIÓN BD
    if (this.usuario !== 'admin') {
      this.mostrarMensaje('Usuario no existe', 'El usuario no está registrado');
      return;
    }

    if (this.password !== '1234') {
      this.mostrarMensaje('Contraseña incorrecta', 'Verifica tu contraseña');
      return;
    }

    this.mostrarMensaje('Bienvenido', 'Inicio de sesión exitoso');
    this.modalCtrl.dismiss({ usuario: this.usuario });
  }

  registrarse() {
    if (!this.nombre || !this.email || !this.passwordReg || !this.confirmar) {
      this.mostrarMensaje('Campos incompletos', 'Completa todos los campos');
      return;
    }

    if (this.passwordReg.length < 6) {
      this.mostrarMensaje('Contraseña débil', 'Mínimo 6 caracteres');
      return;
    }

    if (this.passwordReg !== this.confirmar) {
      this.mostrarMensaje('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (this.email === 'admin@mail.com') {
      this.mostrarMensaje('Correo existente', 'Este correo ya está registrado');
      return;
    }

    this.mostrarMensaje('Registro exitoso', 'Cuenta creada correctamente');
    this.cambiarModo('login');
  }
}
