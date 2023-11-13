document.addEventListener("DOMContentLoaded", async function() {
    const perfilLi = document.querySelector('.contenedor-listas-nav li:nth-child(1)');
    perfilLi.classList.add('activo');
  
    // Obtén el correo del almacenamiento local
    const correo = localStorage.getItem('correo');
    if (!correo) {
      console.error('El correo electrónico no está disponible');
      return;
    }
  
    // Obtén los datos del psicólogo
    fetch(`http://localhost:3000/psicologo/${correo}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.text(); // Cambia esto a text()
    })
    .then(data => {
      if (data) {
        try {
          const jsonData = JSON.parse(data); // Intenta analizar los datos como JSON
          document.querySelector('#bienvenida').textContent = `¡Bienvenido(a), ${jsonData.nombre}!`;
          document.querySelector('#Correo').textContent = `${jsonData.correo}`;
          document.querySelector('#Celular').textContent = `${jsonData.numero_telefono}`;

        } catch (error) {
          console.error('Error al analizar los datos:', error);
        }
      } else {
        console.error('No se encontraron datos para el correo:', correo);
      }
    })
    .catch(error => console.error('Error:', error));
});
 
var btnAbrirPopup = document.getElementById('boton-ver'),
	fondoPopup = document.getElementById('fondoPopup'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnAbrirPopup.addEventListener('click', function(){
	fondoPopup.classList.add('active');
	popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	fondoPopup.classList.remove('active');
  popup.classList.remove('active');
});
  