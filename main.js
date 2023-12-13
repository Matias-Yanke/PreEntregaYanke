
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

//Ingreso de datos

let peso = parseFloat(prompt("Ingrese su peso en kilogramos:"));
let altura = parseFloat(prompt("Ingrese su altura en metros:"));

// Verificacion

while (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert("Por favor, ingrese datos válidos.");
    peso = parseFloat(prompt("Ingrese su peso en kilogramos:"));
    altura = parseFloat(prompt("Ingrese su altura en metros:"));
}

//Calculo

const imc = calcularIMC(peso, altura);

//Resultados

let mensaje = "Su índice de masa corporal (IMC) es: " + imc.toFixed(2) + "\n\n";
if (imc < 18.5) {
    mensaje += "Usted está bajo peso.";
} else if (imc >= 18.5 && imc < 24.9) {
    mensaje += "Usted tiene un peso saludable.";
} else if (imc >= 25 && imc < 29.9) {
    mensaje += "Usted está en sobrepeso.";
} else {
    mensaje += "Usted tiene obesidad.";
}
alert(mensaje);