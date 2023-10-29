document.addEventListener("DOMContentLoaded", function() {

    var loginForm = document.getElementById("BotonLogin");

    loginForm.addEventListener("click", function(event) {

        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var data = {
            username: username,
            password: password
        };

        var url = "http://localhost:8080/api/students";

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'students/json'
            },
            mode: 'cors'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            var userFound = data.find(user => user.correo === username && user.contrasena === password);

        //Si username y password son correctos, se redirige a la página de perfil

            if(username == students.correo && password == students.contrasena){
                localStorage.setItem("token", "token");
                window.location.href = "FISIMentalSync-Frontend/pages-alumno/perfil.html";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        }).catch(function(error) {
            console.log(error);
        });

    });
});