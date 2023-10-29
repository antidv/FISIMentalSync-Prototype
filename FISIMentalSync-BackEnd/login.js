var data = {
    username: username,
    password: password
};
   
    document.addEventListener("DOMContentLoaded", function() {

    var loginForm = document.getElementById("BotonLogin");

    loginForm.addEventListener("click", function(event) {

        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        

       var url = "http://localhost:3000/students";
        
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'

        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            var userFound = data.find(user => user.correo === username && user.contrasena === password);
            if(userFound){
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