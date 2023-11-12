import { createBarraNav } from './barra-navegacion.js';

//Si el usuario es alumno
const grupos = [
  { enlace: './inicio.html', icon: 'fa-solid fa-house', texto: 'Inicio' },
  { enlace: './perfil.html', icon: 'fa-regular fa-circle-user', texto: 'Mi perfil' },
  { enlace: './actividades.html', icon: 'fa-solid fa-puzzle-piece', texto: 'Actividades' },
  { enlace: './citas.html', icon: 'fa-regular fa-clock', texto: 'Reservar Cita' },
  { enlace: './psicologos.html', icon: 'fa-solid fa-magnifying-glass', texto: 'Ver Psicólogos' },
  { enlace: '../../index.html', icon: 'fa-solid fa-arrow-right-from-bracket', texto: 'Cerrar sesión' }
];

const barraNavegacion = createBarraNav(grupos);
const app = document.getElementById('App');
app.insertBefore(barraNavegacion, app.firstChild);