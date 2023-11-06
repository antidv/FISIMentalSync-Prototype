document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("BotonLogin");
    var correoInput = document.getElementById("correo");
    var contrasenaInput = document.getElementById("contrasena");

    loginForm.addEventListener("click", function(event) {
        event.preventDefault();

        var correo = correoInput.value;
        var contrasena = contrasenaInput.value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                correo: correo,
                contrasena: contrasena
            })
        })
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            if(data.message === "Inicio de sesión exitoso"){
                localStorage.setItem("token", "token");
                window.location.href = "FISIMentalSync-Frontend-MPA/pages-alumno/inicio.html";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    });
});
