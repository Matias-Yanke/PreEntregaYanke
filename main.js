document.addEventListener('DOMContentLoaded', async () => {
    // Array para almacenar los usuarios
    let usuarios = [];

    // Cargar usuarios desde el archivo JSON al iniciar la página
    const usuariosJSON = await fetch('./usuarios.json');
    if (usuariosJSON.ok) {
        usuarios = await usuariosJSON.json();
    }

    // Función para calcular el Índice de Masa Corporal (IMC) de un usuario
    function calcularIMC(peso, altura) {
        return peso / (altura * altura);
    }

    // Función para obtener los datos del usuario ingresados en el formulario
    function obtenerDatosUsuario() {
        const nombreInput = document.getElementById('nombre');
        const pesoInput = document.getElementById('peso');
        const alturaInput = document.getElementById('altura');

        const nombre = nombreInput.value.trim();
        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);

        // Validar que los datos ingresados sean correctos
        if (!nombre || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
            alert("Por favor, ingrese datos válidos.");
            return null;
        }

        // Calcular el IMC del usuario
        const imc = calcularIMC(peso, altura);

        return { nombre, peso, altura, imc };
    }

    // Función para buscar el usuario con el IMC más alto en el array de usuarios
    function buscarIMCMaximo(usuarios) {
        return usuarios.reduce((max, usuario) => (usuario.imc > max.imc ? usuario : max), usuarios[0]);
    }

    // Función para buscar el usuario con el IMC más bajo en el array de usuarios
    function buscarIMCMinimo(usuarios) {
        return usuarios.reduce((min, usuario) => (usuario.imc < min.imc ? usuario : min), usuarios[0]);
    }

    // Función para mostrar los datos del usuario con IMC destacado en el DOM
    function mostrarResultadoUsuario(usuario) {
        const resultadoContainer = document.getElementById('resultado-container');
        resultadoContainer.innerHTML = `
            <p>Usuario destacado:</p>
            <p>Nombre: ${usuario.nombre}</p>
            <p>IMC: ${usuario.imc.toFixed(2)}</p>
        `;
    }

    // Función para agregar un nuevo usuario y actualizar el DOM
    function agregarUsuarioYActualizarDOM() {
        const datosUsuario = obtenerDatosUsuario();

        if (datosUsuario) {
            usuarios.push(datosUsuario);

            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // alerta con libreria sweetalert
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Datos cargados con éxito",
                showConfirmButton: false,
                timer: 1500
            });

            actualizarDOM();
            
        }
    }

    // Función para eliminar todos los datos de usuarios y actualizar el DOM
    function eliminarTodosLosDatos() {
        usuarios.length = 0;
        localStorage.removeItem('usuarios');
        actualizarDOM();
    }

    // Función para actualizar la visualización de usuarios en el DOM
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

    // Actualizar el DOM al cargar la página
    actualizarDOM();
});
