// Función para calcular el IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Datos del usuario
function obtenerDatosUsuario() {
    const nombreInput = document.getElementById('nombre');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');

    const datos = {
        nombre: nombreInput.value,
        peso: parseFloat(pesoInput.value),
        altura: parseFloat(alturaInput.value),
    };

    if (
        isNaN(datos.peso) ||
        isNaN(datos.altura) ||
        datos.peso <= 0 ||
        datos.altura <= 0 ||
        datos.nombre.trim() === ""
    ) {
        alert("Por favor, ingrese datos válidos.");
        return null;
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

// Mostrar resultado de usuario en el DOM
function mostrarResultadoUsuario(usuario) {
    const resultadoContainer = document.getElementById('resultado-container');
    resultadoContainer.innerHTML = `
        <p>Usuario destacado:</p>
        <p>Nombre: ${usuario.nombre}</p>
        <p>IMC: ${usuario.imc.toFixed(2)}</p>
    `;
}

// Agregar usuarios al array y almacenar en Local Storage
function agregarUsuarioYActualizarDOM() {
    const datosUsuario = obtenerDatosUsuario();

    if (datosUsuario) {
        usuarios.push(datosUsuario);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        actualizarDOM();
    }
}

// Eliminar todos los datos
function eliminarTodosLosDatos() {
    
    usuarios.length = 0;
    localStorage.removeItem('usuarios');

    actualizarDOM();
}

// Lista de usuarios
function actualizarDOM() {
    const contenedorUsuarios = document.getElementById('usuarios-container');
    contenedorUsuarios.innerHTML = '';

    usuarios.forEach(usuario => {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.classList.add('usuario');

        const contenidoUsuario = `
            <p><strong>Nombre:</strong> ${usuario.nombre}</p>
            <p><strong>Peso:</strong> ${usuario.peso} kg</p>
            <p><strong>Altura:</strong> ${usuario.altura} m</p>
            <p><strong>IMC:</strong> ${usuario.imc.toFixed(2)}</p>
        `;

        usuarioDiv.innerHTML = contenidoUsuario;
        contenedorUsuarios.appendChild(usuarioDiv);
    });

    // Mostrar el IMC máximo y mínimo
    const usuarioConIMCMaximo = buscarIMCMaximo(usuarios);
    const usuarioConIMCMinimo = buscarIMCMinimo(usuarios);
    const resultadoContainer = document.getElementById('resultado-container');
    resultadoContainer.innerHTML = `
        <p>Usuario con IMC más alto:</p>
        <p>Nombre: ${usuarioConIMCMaximo.nombre}</p>
        <p>IMC: ${usuarioConIMCMaximo.imc.toFixed(2)}</p>
        
        <p>Usuario con IMC más bajo:</p>
        <p>Nombre: ${usuarioConIMCMinimo.nombre}</p>
        <p>IMC: ${usuarioConIMCMinimo.imc.toFixed(2)}</p>
    `;
}

// Botones
document.getElementById('calcularIMCButton').addEventListener('click', agregarUsuarioYActualizarDOM);
document.getElementById('mostrarIMCMaximoButton').addEventListener('click', () => mostrarResultadoUsuario(buscarIMCMaximo(usuarios)));
document.getElementById('mostrarIMCMinimoButton').addEventListener('click', () => mostrarResultadoUsuario(buscarIMCMinimo(usuarios)));
document.getElementById('eliminarTodosLosDatosButton').addEventListener('click', eliminarTodosLosDatos);

// Recuperar usuarios almacenados en Local Storage
const usuariosJSON = localStorage.getItem('usuarios');
const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

actualizarDOM();
