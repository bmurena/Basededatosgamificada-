import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  AlertController,
  IonContent,
  IonButton,
  IonItem,
  IonInput
} from '@ionic/angular/standalone';

interface Usuario {
  nombre: string;
  usuario: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonItem,
    IonInput,
    CommonModule,
    FormsModule,
    IonContent
]
})
export class LoginPage implements OnInit {

  modo: 'login' | 'registro' = 'login';

  // LOGIN
  loginId = '';
  password = '';

  // REGISTRO
  nombre = '';
  usuarioReg = '';
  email = '';
  passwordReg = '';
  confirmar = '';

  // "Base de datos" temporal
  usuarios: Usuario[] = [];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Cargar usuarios guardados (si existen)
    const data = localStorage.getItem('usuarios');
    if (data) {
      this.usuarios = JSON.parse(data);
    }
  }

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

  // ======================
  // INICIAR SESIÓN
  // ======================
  iniciarSesion() {
    if (!this.loginId || !this.password) {
      this.mostrarMensaje(
        'Campos incompletos',
        'Ingresa usuario o correo y contraseña'
      );
      return;
    }

    const usuarioEncontrado = this.usuarios.find(
      u =>
        (u.usuario === this.loginId || u.email === this.loginId) &&
        u.password === this.password
    );

    if (!usuarioEncontrado) {
      this.mostrarMensaje('Error', 'Credenciales incorrectas');
      return;
    }

    // 👉 GUARDAR USUARIO LOGUEADO (CLAVE PARA QUE FUNCIONE INICIO)
    localStorage.setItem('usuario', usuarioEncontrado.usuario);

    this.mostrarMensaje(
      'Bienvenido',
      `Hola ${usuarioEncontrado.nombre}`
    );

    this.modalCtrl.dismiss();
  }

  // ======================
  // REGISTRO
  // ======================
  registrarse() {
    if (
      !this.nombre ||
      !this.usuarioReg ||
      !this.email ||
      !this.passwordReg ||
      !this.confirmar
    ) {
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

    const existe = this.usuarios.some(
      u => u.usuario === this.usuarioReg || u.email === this.email
    );

    if (existe) {
      this.mostrarMensaje(
        'Cuenta existente',
        'Usuario o correo ya registrado'
      );
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: this.nombre,
      usuario: this.usuarioReg,
      email: this.email,
      password: this.passwordReg
    };

    this.usuarios.push(nuevoUsuario);

    // 👉 GUARDAR "BASE DE DATOS" VISUAL
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    this.mostrarMensaje(
      'Registro exitoso',
      'Ahora puedes iniciar sesión'
    );

    this.cambiarModo('login');

    // Limpiar campos
    this.nombre = '';
    this.usuarioReg = '';
    this.email = '';
    this.passwordReg = '';
    this.confirmar = '';
  }
}
