import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonRouterLink,
  ModalController
} from '@ionic/angular/standalone';
import { LoginPage } from '../login/login.page';

interface Pregunta {
  texto: string;
  opciones: string[];
  correcta: number;
}

@Component({
  selector: 'app-practica',
  templateUrl: './practica.page.html',
  styleUrls: ['./practica.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonRouterLink,
    RouterModule,
    CommonModule,
    FormsModule
  ]
})
export class PracticaPage implements OnInit {

  /** 🔐 USUARIO */
 usuario: string | null = null;
  menuUsuarioAbierto = false;

  /** QUIZ */
  nivelActual = 0;
  preguntaActual = 0;
  feedback = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
  }

  async abrirLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginPage
    });

    modal.onDidDismiss().then(res => {
      if (res.data?.usuario) {
        this.usuario = res.data.usuario;
        localStorage.setItem('usuario', res.data.usuario);
      }
    });

    await modal.present();
  }

  abrirMenuUsuario() {
    const cerrar = confirm('¿Deseas cerrar sesión?');
    if (cerrar) {
      localStorage.removeItem('usuario');
      this.usuario = null;
    }

     cerrarSesion() 
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.menuUsuarioAbierto = false;
  
  }

    preguntas: { [key: number]: Pregunta[] } = {
    /* ===== NIVEL 1 – FUNDAMENTOS ===== */
    1: [
      {
        texto: 'Una base de datos es un componente fundamental en los sistemas de información. ¿Cuál de las siguientes opciones describe mejor qué es una base de datos?',
        opciones: [
          'Un programa para escribir documentos',
          'Un conjunto de datos organizados que permiten almacenar y recuperar información',
          'Un lenguaje de programación',
          'Un dispositivo físico de almacenamiento'
        ],
        correcta: 1
      },
      {
        texto: 'En el contexto de bases de datos, ¿cuál es la diferencia principal entre un dato y la información?',
        opciones: [
          'No existe ninguna diferencia',
          'El dato es información procesada',
          'La información es un dato procesado y con significado',
          'Ambos conceptos significan lo mismo'
        ],
        correcta: 2
      },
      {
        texto: '¿Cuál es una ventaja clave de utilizar una base de datos en lugar de archivos tradicionales?',
        opciones: [
          'Mayor desorden de datos',
          'Duplicación constante de información',
          'Mejor organización, seguridad y acceso a la información',
          'Mayor dificultad para consultar datos'
        ],
        correcta: 2
      },
      {
        texto: 'Las bases de datos se utilizan en la vida cotidiana principalmente para:',
        opciones: [
          'Guardar solo documentos de texto',
          'Administrar información de sistemas como bancos, universidades y empresas',
          'Crear imágenes y videos',
          'Diseñar páginas web'
        ],
        correcta: 1
      },
      {
        texto: 'Un ejemplo real de uso de una base de datos es:',
        opciones: [
          'Un cuaderno escrito a mano',
          'El registro de calificaciones de estudiantes en una universidad',
          'Un dibujo en Paint',
          'Una presentación en PowerPoint'
        ],
        correcta: 1
      }
    ],

    /* ===== NIVEL 2 – ENTIDADES Y ATRIBUTOS ===== */
    2: [
      {
        texto: 'En el modelo de bases de datos, una entidad representa:',
        opciones: [
          'Un atributo sin importancia',
          'Un objeto o concepto del mundo real sobre el que se desea almacenar información',
          'Una relación entre tablas',
          'Un archivo del sistema'
        ],
        correcta: 1
      },
      {
        texto: '¿Cuál de los siguientes es un ejemplo correcto de entidad en una base de datos académica?',
        opciones: [
          'Edad',
          'Nombre',
          'Estudiante',
          'Promedio'
        ],
        correcta: 2
      },
      {
        texto: 'Un atributo dentro de una entidad se define como:',
        opciones: [
          'Una relación entre entidades',
          'Una característica que describe a la entidad',
          'Una tabla completa',
          'Una base de datos'
        ],
        correcta: 1
      },
      {
        texto: 'La clave primaria tiene como función principal:',
        opciones: [
          'Duplicar registros',
          'Identificar de forma única a cada entidad',
          'Relacionar atributos',
          'Eliminar datos'
        ],
        correcta: 1
      },
      {
        texto: '¿Por qué es importante definir correctamente una clave primaria?',
        opciones: [
          'Para permitir registros repetidos',
          'Para evitar confusión y duplicación de datos',
          'Para eliminar entidades',
          'Para crear relaciones innecesarias'
        ],
        correcta: 1
      }
    ],

    /* ===== NIVEL 3 – INTERRELACIONES ===== */
    3: [
      {
        texto: 'Las interrelaciones en un modelo entidad–relación sirven para:',
        opciones: [
          'Describir cómo se conectan las entidades entre sí',
          'Eliminar entidades',
          'Crear atributos',
          'Almacenar datos'
        ],
        correcta: 0
      },
      {
        texto: 'Una relación de tipo uno a muchos (1:N) significa que:',
        opciones: [
          'Una entidad se relaciona con una sola',
          'Muchas entidades se relacionan con muchas',
          'Una entidad puede relacionarse con varias entidades de otro tipo',
          'No existe relación'
        ],
        correcta: 2
      },
      {
        texto: '¿Cuál es un ejemplo correcto de una relación muchos a muchos (N:M)?',
        opciones: [
          'Persona – DNI',
          'Estudiante – Curso',
          'Auto – Placa',
          'Usuario – Perfil'
        ],
        correcta: 1
      },
      {
        texto: 'La cardinalidad indica:',
        opciones: [
          'El número de atributos',
          'La cantidad de entidades que pueden relacionarse',
          'El tipo de dato',
          'La clave primaria'
        ],
        correcta: 1
      },
      {
        texto: 'En los diagramas E-R, las relaciones se representan mediante:',
        opciones: [
          'Óvalos',
          'Rectángulos',
          'Rombos',
          'Círculos'
        ],
        correcta: 2
      }
    ],

    /* ===== NIVEL 4 – MODELO ENTIDAD RELACIÓN ===== */
    4: [
      {
        texto: 'El modelo Entidad–Relación se utiliza principalmente para:',
        opciones: [
          'Programar aplicaciones',
          'Diseñar la estructura de una base de datos',
          'Ejecutar consultas SQL',
          'Eliminar registros'
        ],
        correcta: 1
      },
      {
        texto: 'En un diagrama E-R, los rectángulos representan:',
        opciones: [
          'Atributos',
          'Relaciones',
          'Entidades',
          'Claves'
        ],
        correcta: 2
      },
      {
        texto: '¿Cuál es el propósito del modelo conceptual?',
        opciones: [
          'Mostrar la base de datos final',
          'Representar gráficamente la información antes de implementarla',
          'Ejecutar comandos SQL',
          'Guardar datos físicos'
        ],
        correcta: 1
      },
      {
        texto: 'El modelo E-R pertenece a la fase:',
        opciones: [
          'Física',
          'Interna',
          'Conceptual',
          'Operativa'
        ],
        correcta: 2
      },
      {
        texto: '¿Por qué es importante el modelo E-R?',
        opciones: [
          'Porque reemplaza al SQL',
          'Porque permite visualizar y corregir errores antes de implementar la base de datos',
          'Porque elimina datos',
          'Porque ejecuta consultas'
        ],
        correcta: 1
      }
    ],

    /* ===== NIVEL 5 – GENERALIZACIÓN ===== */
    5: [
      {
        texto: 'La generalización en bases de datos permite:',
        opciones: [
          'Eliminar entidades',
          'Agrupar entidades similares en una entidad más general',
          'Duplicar información',
          'Crear relaciones innecesarias'
        ],
        correcta: 1
      },
      {
        texto: '¿Cuál es un ejemplo correcto de generalización?',
        opciones: [
          'Alumno y Profesor → Persona',
          'Curso y Aula → Materia',
          'Edad y Nombre → Persona',
          'Clave y atributo → Tabla'
        ],
        correcta: 0
      },
      {
        texto: 'La especialización es el proceso contrario a:',
        opciones: [
          'Normalización',
          'Generalización',
          'Relación',
          'Entidad'
        ],
        correcta: 1
      },
      {
        texto: 'La generalización ayuda principalmente a:',
        opciones: [
          'Reducir redundancia y mejorar el diseño',
          'Aumentar errores',
          'Duplicar datos',
          'Eliminar claves'
        ],
        correcta: 0
      },
      {
        texto: 'Este concepto pertenece al modelo:',
        opciones: [
          'Físico',
          'Interno',
          'Conceptual',
          'Operativo'
        ],
        correcta: 2
      }
    ]
  };

  iniciarNivel(n: number) {
    this.nivelActual = n;
    this.preguntaActual = 0;
    this.feedback = '';
  }

  responder(opcion: number) {
    const pregunta = this.preguntas[this.nivelActual][this.preguntaActual];

    if (opcion === pregunta.correcta) {
      this.feedback = '✅ Respuesta correcta. Muy bien.';
      this.preguntaActual++;
    } else {
      this.feedback = '❌ Respuesta incorrecta. Revisa el contenido del nivel en la sección Aprende.';
    }

    if (this.preguntaActual === 5) {
      this.nivelActual = 0;
    }
  }
}

function cerrarSesion() {
  throw new Error('Function not implemented.');
}

