document.addEventListener("DOMContentLoaded", async function () {
  const perfilLi = document.querySelector('.contenedor-listas-nav li:nth-child(3)');
  perfilLi.classList.add('activo');

  const correo = localStorage.getItem('correo');

  if (!correo) {
    console.error('El correo electrónico no está disponible');
    return;
  }

  fetch(`http://localhost:3000/alumno/${correo}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        try {
          const jsonData = data;
          document.querySelector('#bienvenida').textContent = `¡Bienvenido ${jsonData.nombre}!`;

          const numeroReservas = 6;
          const tablaCitas = document.querySelector('.tabla-citas tbody');

          const columnasCita = document.querySelectorAll('.columna-cita');

          for (let i = 0; i < numeroReservas; i++) {
            const fila = document.createElement('tr');

            const columnaNumeroReserva = document.createElement('td');
            columnaNumeroReserva.textContent = i + 1;
            fila.appendChild(columnaNumeroReserva);

            // Itera sobre las columnas seleccionadas y clona su contenido
            columnasCita.forEach(columna => {
              const columnaClonada = columna.cloneNode(true);
              fila.appendChild(columnaClonada);
            });

            // Agrega cada fila a la tabla
            tablaCitas.appendChild(fila);
          }
        } catch (error) {
          console.error('Error al analizar los datos:', error);
        }
      } else {
        console.error('No se encontraron datos para el correo:', correo);
      }
    })
    .catch(error => console.error('Error:', error));
});
