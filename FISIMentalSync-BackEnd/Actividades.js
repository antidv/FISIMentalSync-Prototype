document.addEventListener("DOMContentLoaded", async function() {
    const perfilLi = document.querySelector('.contenedor-listas-nav li:nth-child(3)');
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
     return response.text(); 
    })
    .then(data => {
     if (data) {
       try {
         const jsonData = JSON.parse(data);
         document.querySelector('#bienvenida').textContent = `¡Bienvenido ${jsonData.nombre}`;        
       } catch (error) {
         console.error('Error al analizar los datos:', error);
       }
     } else {
       console.error('No se encontraron datos para el correo:', correo);
     }
    })
    .catch(error => console.error('Error:', error));
  
    


















  });
