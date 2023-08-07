
//login
const Clientes = JSON.parse(localStorage.getItem("reservaciones"));

const cambiarUsuario = document.getElementById("cambiarUsuario");
const nuevoUsuario = document.getElementById("nuevoUsuario");
const guardarUsuario = document.getElementById("guardarUsuario");
const comienzo = document.getElementById("comienzo");
const nuevaReservacionBtn = document.getElementById("nuevaReservacionBtn");
const nueva_reservacion = document.getElementById("nueva_reservacion");
const crearReservacionBtn = document.getElementById("crearReservacionBtn");

function actualizarSaludo(usuario) {
  comienzo.textContent = "¡Bienvenido, " + usuario + "!";
}

const usuarioGuardado = localStorage.getItem("Usuario");

if (usuarioGuardado) {
  actualizarSaludo(usuarioGuardado);
}else {
  comienzo.textContent = "Bienvenido! Por favor, inicia sesión.";
}

cambiarUsuario.addEventListener("click", function () {
  nuevoUsuario.hidden = false;
  guardarUsuario.hidden = false;
});

guardarUsuario.addEventListener("click", function () {
  const nuevoUsuarioD = nuevoUsuario.value;
  if (nuevoUsuarioD) {
    localStorage.setItem("Usuario", nuevoUsuarioD);
    actualizarSaludo(nuevoUsuarioD);
    nuevoUsuario.value = "";
    nuevoUsuario.hidden = true;
    guardarUsuario.hidden = true;
  }

})


//Tus reservaciones
const tablaReservaciones = document.getElementById("tablaReservaciones").getElementsByTagName('tbody')[0];

const reservacionesUsuario = Clientes.filter((cliente)=>cliente.Nombre === usuarioGuardado);
console.log(usuarioGuardado)

reservacionesUsuario.forEach(function (cliente) {
  const fila = tablaReservaciones.insertRow();
  const celdaLocal = fila.insertCell(0);
  const celdaLugar = fila.insertCell(1);
  const celdaCantidad = fila.insertCell(2);
  const celdaFecha = fila.insertCell(3);

  celdaLocal.textContent = cliente.local;
  celdaLugar.textContent = cliente.lugar;
  celdaCantidad.textContent = cliente.cantidad;
  celdaFecha.textContent = cliente.fecha;
});

//Nueva reservacion 
nuevaReservacionBtn.addEventListener("click", function() {
  nueva_reservacion.style.display = "block";});


crearReservacionBtn.addEventListener("click", function () {
  const local = document.getElementById("local").value;
  const cantidad = document.getElementById("cantidad").value;
  const preferencia = document.getElementById("preferencia").value;
  const fecha = document.getElementById("fecha").value;
  const celiaco = document.getElementById("celiaco").value;

  let multiplicador = 0;
    //multiplicador
    if(document.getElementById("preferencia").value==1){
      multiplicador = 200 + 5 * cantidad;
    } else if (preferencia == 2) {
      multiplicador = 200 + 5 * (cantidad * 0.9);
    } else if (preferencia == 3) {
      multiplicador = 200 + 5 * (cantidad * 1.2);
    } else if (preferencia == 4) {
      multiplicador = 200 + 5 * (cantidad * 0.75);
    }


    const nuevaReserva = {
    id: 0, // Momentáneo
    lugar: preferencia,
    cantidad: cantidad,
    Nombre: usuarioGuardado,
    multiplicador: multiplicador,
    fecha: fecha,
    local: local
    };

    const reservacionesExistentes = JSON.parse(localStorage.getItem("reservaciones")) || [];
    reservacionesExistentes.push(nuevaReserva);
    localStorage.setItem("reservaciones", JSON.stringify(reservacionesExistentes));
    
    while (tablaReservaciones.firstChild) {
      tablaReservaciones.removeChild(tablaReservaciones.firstChild);
    }

    const reservacionesUsuario = reservacionesExistentes.filter((cliente) => cliente.Nombre === usuarioGuardado);
  reservacionesUsuario.forEach(function (cliente) {
    const fila = tablaReservaciones.insertRow();
    const celdaLocal = fila.insertCell(0);
    const celdaLugar = fila.insertCell(1);
    const celdaCantidad = fila.insertCell(2);
    const celdaFecha = fila.insertCell(3);

    celdaLocal.textContent = cliente.local;
    celdaLugar.textContent = cliente.lugar;
    celdaCantidad.textContent = cliente.cantidad;
    celdaFecha.textContent = cliente.fecha;
  });
    
    nueva_reservacion.style.display = "none";
  });

 


