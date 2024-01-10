// Función para calcular el IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Función para obtener datos del usuario
function obtenerDatosUsuario() {
    let datos = {};

    datos.peso = parseFloat(prompt("Ingrese su peso en kilogramos:"));
    datos.altura = parseFloat(prompt("Ingrese su altura en metros:"));

    while (isNaN(datos.peso) || isNaN(datos.altura) || datos.peso <= 0 || datos.altura <= 0) {
        alert("Por favor, ingrese datos válidos.");
        datos.peso = parseFloat(prompt("Ingrese su peso en kilogramos:"));
        datos.altura = parseFloat(prompt("Ingrese su altura en metros:"));
    }

    return datos;
}

// Función para calcular el IMC y devolver un mensaje
function interpretarIMC(imc) {
    if (imc < 18.5) {
        return "Usted está bajo peso.";
    } else if (imc >= 18.5 && imc < 24.9) {
        return "Usted tiene un peso saludable.";
    } else if (imc >= 25 && imc < 29.9) {
        return "Usted está en sobrepeso.";
    } else {
        return "Usted tiene obesidad.";
    }
}

//Llamar a las funciones anteriores
function ejecutarPrograma() {
    
    const datosUsuario = obtenerDatosUsuario();

    
    const imc = calcularIMC(datosUsuario.peso, datosUsuario.altura);

   
    const mensaje = "Su índice de masa corporal (IMC) es: " + imc.toFixed(2) + "\n\n" + interpretarIMC(imc);

    
    alert(mensaje);
}


ejecutarPrograma();