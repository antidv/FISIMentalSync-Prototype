document.addEventListener("DOMContentLoaded", async function() {
    fetch(`http://localhost:3000/analiticas`)
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then(data => {
        document.querySelector('#cantAlumnos').textContent = data.cantAlumnos;
        document.querySelector('#cantCitas').textContent = data.cantCitas;
        
        if (data.promedioGradoSatis !== null) {
            document.querySelector('#promedioGradoSatis').textContent = data.promedioGradoSatis.toFixed(2);
        } else {
            document.querySelector('#promedioGradoSatis').textContent = "0";
        }        

    })
    .catch(error => {
        console.error('Error:', error);
    });
});
