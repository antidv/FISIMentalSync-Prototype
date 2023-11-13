document.addEventListener("DOMContentLoaded", async function() {
  
  const perfilLi = document.querySelector('.contenedor-listas-nav li:nth-child(2)');
  perfilLi.classList.add('activo');
 
  const correo = localStorage.getItem('correo');

  if (!correo) {
    console.error('El correo electrónico no está disponible');
    return;} 
  
  fetch(`http://localhost:3000/alumno/${correo}`)
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
       document.querySelector('#bienvenida').textContent = `¡Bienvenido ${jsonData.nombre}!`;
       document.getElementById('nombre-apellido').textContent = `${jsonData.nombre  + ' ' + jsonData.apellido}`;
       document.getElementById('estado').textContent = jsonData.estado;
       document.getElementById('codigo').textContent = jsonData.codigo;
       document.getElementById('promedio-ponderado').textContent = jsonData.ponderado;
       document.getElementById('escuela-profesional').textContent = jsonData.escuela_prof	;
        
     } catch (error) {
       console.error('Error al analizar los datos:', error);
     }
   } else {
     console.error('No se encontraron datos para el correo:', correo);
   }
  })
  .catch(error => console.error('Error:', error));
 
});