require('dotenv').config()
const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to PlanetScale!');
    
    const createTableQuery = `
        CREATE TABLE Administrador (
            idAdministrador INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(1000),
            correo VARCHAR(100),
            contrasena VARCHAR(100),
            PRIMARY KEY (idAdministrador)
        )

        CREATE TABLE Alumno (
            idAlumno INT NOT NULL,
            nombre VARCHAR(1000),
            sexo VARCHAR(50),
            escuela_prof VARCHAR(100),
            historial VARCHAR(200),
            correo VARCHAR(100),
            contrasena VARCHAR(100),
            fecha_nac TIMESTAMP,
            estado VARCHAR(20),
            url_reporte VARCHAR(1000),
            PRIMARY KEY (idAlumno)
        )

        CREATE TABLE IESIndividual (
            idIESIndividual INT NOT NULL AUTO_INCREMENT,
            idAlumno INT NOT NULL,
            grado_satis_prom INT,
            url_informe VARCHAR(1000),
            url_diagrama VARCHAR(1000),
            ciclo INT NOT NULL,
            FOREIGN KEY (idAlumno) REFERENCES Alumno(idAlumno) ON DELETE CASCADE ON UPDATE CASCADE,
        )

        CREATE TABLE Psicologo (
            idPsicologo INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(1000),
            correo VARCHAR(100),
            contrasena VARCHAR(100),
            PRIMARY KEY (idPsicologo)
        )

        CREATE TABLE Horario_Psicologo (
            idPsicologo INT NOT NULL,
            horario_inicio TIMESTAMP,
            horario_final TIMESTAMP,
            FOREIGN KEY (idPsicologo) REFERENCES Psicologo(idPsicologo) ON DELETE CASCADE ON UPDATE CASCADE
        )

        CREATE TABLE Cita (
            idCita INT NOT NULL AUTO_INCREMENT,
            idPsicologo INT NOT NULL,
            idAlumno INT NOT NULL,
            horario_inicio TIMESTAMP,
            horario_final TIMESTAMP,
            grado_satisfaccion INT NOT NULL,
            ciclo INT NOT NULL,
            FOREIGN KEY (idPsicologo) REFERENCES Psicologo(idPsicologo) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (idAlumno) REFERENCES Alumno(idAlumno) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (idCita)
        )

        CREATE TABLE Diagnosito (
            idDiagnostico INT NOT NULL AUTO_INCREMENT,
            idAlumno INT NOT NULL,
            idPatologia INT NOT NULL,
            descripcion VARCHAR(1000),
            FOREIGN KEY (idAlumno) REFERENCES Alumno(idAlumno) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (idPatologia) REFERENCES Patologia(idPatologia) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (idDiagnostico)
        )

        CREATE TABLE Patologia (
            idPatologia INT NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(1000),
            PRIMARY KEY (idPatologia)
        )

        CREATE TABLE IESColectivo (
            idIESColectivo INT NOT NULL AUTO_INCREMENT,
            total_estudiantes INT NOT NULL,
            total_asistencias INT NOT NULL,
            grado_satis_prom INT,
            ciclo INT NOT NULL,
            url_pat_soft_prom VARCHAR(1000),
            url_pat_sist_prom VARCHAR(1000),
            url_pat_fac_prom VARCHAR(1000),
            url_diag_asist VARCHAR(1000),
            url_informe VARCHAR(1000),
            PRIMARY KEY (idIESColectivo)
        )
    `;
    
    await connection.query(createTableQuery);
    console.log('Table created successfully');
    
    connection.end();
}

main();
