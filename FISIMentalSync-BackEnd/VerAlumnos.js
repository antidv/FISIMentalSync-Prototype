//Logica de ver alumnos :)

document.addEventListener("DOMContentLoaded", async function () {

  var buscarAlumnosForm = document.getElementById("BotonBuscarAlumnos");

  buscarAlumnosForm.addEventListener("click", function (event) {
    event.preventDefault();

    /*var nombreAlumno = document.getElementById("alumno-nombre").value;
    var apellidoAlumno = document.getElementById("alumno-apellido").value;*/
    var correoAlumno = document.getElementById("alumno-correo").value;

    fetch(`http://localhost:3000/alumno/${correoAlumno}`)
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
          document.getElementById('nombre-alumno-tabla').textContent = `${jsonData.nombre}`;
          document.getElementById('escuela-alumno-tabla').textContent = jsonData.escuela_prof	;
          document.getElementById('estado-alumno-tabla').textContent = jsonData.estado;
          document.getElementById('codigo-alumno-tabla').textContent = jsonData.codigo;
          document.getElementById('sexo-alumno-tabla').textContent = jsonData.sexo;
           
        } catch (error) {
          console.error('Error al analizar los datos:', error);
        }
      } else {
        console.error('No se encontraron datos para el correo:', correo);
      }
     })
     .catch(error => console.error('Error:', error));

  });
});
