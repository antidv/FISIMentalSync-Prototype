// Lógica login.js

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
                'Content-Type': 'application/json' // Corregido aquí
            },
            body: JSON.stringify({
                correo: username,
                contrasena: password
            }),
            mode: 'cors'
        }).then(function(response) {
            if(response.ok) {
                return response.json(); 
            } else {
                throw new Error('Usuario o contraseña incorrectos');
            }
        }).then(function(data) {
            if (data.success) {
                localStorage.setItem("correo", username);
                localStorage.setItem("token", data.token); 
                if (data.role === 'Psicologo') {
                    window.location.href = "../FISIMentalSync-FrontEnd-MPA/pages-psicologo/perfil.html";
                } else {
                    window.location.href = "../FISIMentalSync-FrontEnd-MPA/pages-alumno/inicio.html";
                }
            } else {
                alert(data.message);
            }
        }).catch(function(error) {
            console.log(error);
            alert(error.message);
        });
  
    });
  });
  