document.addEventListener("DOMContentLoaded", function() {

    var loginForm = document.getElementById("BotonLogin");

    loginForm.addEventListener("click", function(event) {

        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var url = "http://localhost:3000/login";
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: username,
                contrasena: password
            }),
            mode: 'cors'

        }).then(function(response) {
            if(response.ok) {
                localStorage.setItem("token", "token");
                window.location.href = "FISIMentalSync-Frontend-MPA/pages-alumno/inicio.html";
            } else {
                throw new Error('Usuario o contraseña incorrectos');
            }
        }).catch(function(error) {
            console.log(error);
            alert(error.message);
        });

    });
});
