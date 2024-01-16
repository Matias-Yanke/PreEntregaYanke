// Función para calcular el IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Datos del usuario
function obtenerDatosUsuario() {
    let datos = {};

    datos.nombre = prompt("Ingrese su nombre:");
    datos.peso = parseFloat(prompt("Ingrese su peso en kilogramos:"));
    datos.altura = parseFloat(prompt("Ingrese su altura en metros:"));

    while (
        isNaN(datos.peso) ||
        isNaN(datos.altura) ||
        datos.peso <= 0 ||
        datos.altura <= 0 ||
        datos.nombre.trim() === ""
    ) {
        alert("Por favor, ingrese datos válidos.");
        datos.nombre = prompt("Ingrese su nombre:");
        datos.peso = parseFloat(prompt("Ingrese su peso en kilogramos:"));
        datos.altura = parseFloat(prompt("Ingrese su altura en metros:"));
    }

    datos.imc = calcularIMC(datos.peso, datos.altura);

    return datos;
}

// IMC más alto en el array
function buscarIMCMaximo(usuarios) {
    return usuarios.reduce((max, usuario) => (usuario.imc > max.imc ? usuario : max), usuarios[0]);
}

// IMC más bajo en el array
function buscarIMCMinimo(usuarios) {
    return usuarios.reduce((min, usuario) => (usuario.imc < min.imc ? usuario : min), usuarios[0]);
}


function ejecutarPrograma() {
    const usuarios = [];

    do {
    
        const datosUsuario = obtenerDatosUsuario();

        usuarios.push(datosUsuario);

        const agregarMas = confirm("¿Desea agregar más datos de usuarios?");

        if (!agregarMas) {
            break; 
        }
    } while (true);

    // IMC más alto y más bajo
    const usuarioConIMCMaximo = buscarIMCMaximo(usuarios);
    const usuarioConIMCMinimo = buscarIMCMinimo(usuarios);

    // Resultados 
    alert("Usuarios ingresados:\n" + JSON.stringify(usuarios, null, 2));

    alert("Usuario con IMC más alto:\n" +
        "Nombre: " + usuarioConIMCMaximo.nombre + "\n" +
        "IMC: " + usuarioConIMCMaximo.imc.toFixed(2));

    alert("Usuario con IMC más bajo:\n" +
        "Nombre: " + usuarioConIMCMinimo.nombre + "\n" +
        "IMC: " + usuarioConIMCMinimo.imc.toFixed(2));
}


ejecutarPrograma();