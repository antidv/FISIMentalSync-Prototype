import { createBarraNav } from './barra-navegacion.js';

//Si el usuario es psicologo
const grupos = [
  { enlace: './perfil.html', icon: 'fa-regular fa-circle-user', texto: 'Mi perfil' },
  { enlace: './citas.html', icon: 'fa-regular fa-clock', texto: 'Reservar Cita' },
  { enlace: './alumnos.html', icon: 'fa-solid fa-magnifying-glass', texto: 'Ver Alumnos' },
  { enlace: './analiticas.html', icon: 'fa-solid fa-chart-line', texto: 'Analiticas' },
  { enlace: './cAsistencias.html', icon: 'fa-regular fa-file-lines', texto: 'Conteo de asistencias' },
  { enlace: '../../index.html', icon: 'fa-solid fa-arrow-right-from-bracket', texto: 'Cerrar sesión' }
];


const barraNavegacion = createBarraNav(grupos);
const app = document.getElementById('App');
app.insertBefore(barraNavegacion, app.firstChild);