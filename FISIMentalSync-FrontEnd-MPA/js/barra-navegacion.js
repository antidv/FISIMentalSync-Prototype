export function createBarraNav(grupos) {
  const barraNav = document.createElement('div');
  barraNav.classList.add('barra-navegacion');

  const contenedorLogo = createContenedorLogo({ name: 'logo2' });
  barraNav.appendChild(contenedorLogo);

  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  ul.classList.add('contenedor-listas-nav');

  grupos.forEach((grupo) => {
    const grupoListaNav = createGrupoListaNav(grupo);
    ul.appendChild(grupoListaNav);
  });

  nav.appendChild(ul);
  barraNav.appendChild(nav);

  return barraNav;
}

function createContenedorLogo({name}) {
  const contenedorLogo = document.createElement('div');
  contenedorLogo.classList.add('contenedor-logo');

  const img = document.createElement('img');
  img.classList.add('logo-image');
  img.src = `../images/${name}.png`;
  img.alt = 'Logo de FISIMentalSync';

  contenedorLogo.appendChild(img);

  return contenedorLogo;
}

function createGrupoListaNav({ enlace, icon, texto }) {
  const grupoListaNav = document.createElement('li');
  grupoListaNav.classList.add('grupo-lista-nav');

  const link = document.createElement('a');
  link.href = enlace; //modificar
  link.classList.add('contenedor-enlaces');

  const iconNav = document.createElement('span');
  iconNav.classList.add('icon-nav');
  const iconElement = document.createElement('i');
  iconElement.className = icon;
  iconNav.appendChild(iconElement);

  const textBar = document.createElement('p');
  textBar.className = 'text-bar';
  textBar.textContent = texto;

  link.appendChild(iconNav);
  link.appendChild(textBar);
  grupoListaNav.appendChild(link);

  return grupoListaNav;
}