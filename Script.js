//login
const Clientes = JSON.parse(localStorage.getItem("reservaciones"));

let usuarioGuardado = localStorage.getItem("Usuario");
const cambiarUsuario = document.getElementById("cambiarUsuario");
const nuevoUsuario = document.getElementById("nuevoUsuario");
const guardarUsuario = document.getElementById("guardarUsuario");
const comienzo = document.getElementById("comienzo");
const tablaReservaciones = document.getElementById("tablaReservaciones");
const nuevaReservacionBtn = document.getElementById("nuevaReservacionBtn");
const nueva_reservacion = document.getElementById("nueva_reservacion");
const crearReservacionBtn = document.getElementById("crearReservacionBtn");
let reservacionesUsuario;
if(usuarioGuardado!=""){
  reservacionesUsuario = Clientes.filter((cliente)=>cliente.Nombre === usuarioGuardado);
  for(const reservacion of reservacionesUsuario){
    tablaReservaciones.innerHTML+=` 
    <tr>
      <td>${reservacion.local}</td>
      <td>${reservacion.lugar}</td>
      <td>${reservacion.cantidad}</td>
      <td>${reservacion.fecha}</td>
    </tr>
    `
  }
}

function actualizarSaludo(usuario) {
  comienzo.textContent = "¡Bienvenido, " + usuario + "!";
}

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
  tablaReservaciones.innerHTML=``;
  usuarioGuardado= localStorage.getItem("Usuario");
  console.log(usuarioGuardado);
  desplegarTabla(nuevoUsuarioD);
})


//Tus reservaciones
// const tablaReservaciones = document.getElementById("tablaReservaciones").getElementsByTagName('tbody')[0];
// console.log(usuarioGuardado)

// reservacionesUsuario.forEach(function (cliente) {
//   const fila = tablaReservaciones.insertRow();
//   const celdaLocal = fila.insertCell(0);
//   const celdaLugar = fila.insertCell(1);
//   const celdaCantidad = fila.insertCell(2);
//   const celdaFecha = fila.insertCell(3);

//   celdaLocal.textContent = cliente.local;
//   celdaLugar.textContent = cliente.lugar;
//   celdaCantidad.textContent = cliente.cantidad;
//   celdaFecha.textContent = cliente.fecha;
// });


function agregarReservaciones(usuarioGuardado){


  
  console.log(usuarioGuardado)
  carrito.push(producto);
  tablaCarrito.innerHTML +=`
  <tr>
    <td>${producto.id}</td>
    <td>${producto.serie}</td>
    <td>${producto.tomo}</td>
    <td>${producto.precio}</td>
  </tr>
  `;
  
  console.log(resultado)
  totalCarrito.textContent = ``;
  resultado += producto.precio;
  //Resultado
  totalCarrito.textContent = `${resultado}`;
  //Local Storage
  localStorage.setItem("carrito",JSON.stringify(carrito));
}

//Nueva reservacion 
nuevaReservacionBtn.addEventListener("click", function() {
  nueva_reservacion.style.display = "block";});
 console.log(usuarioGuardado+" save");

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

 function desplegarTabla(Username){
  reservacionesUsuario = Clientes.filter((cliente)=>cliente.Nombre === Username);
  console.table(reservacionesUsuario);
  for(const reservacion of reservacionesUsuario){
    tablaReservaciones.innerHTML+=` 
    <tr>
      <td>${reservacion.local}</td>
      <td>${reservacion.lugar}</td>
      <td>${reservacion.cantidad}</td>
      <td>${reservacion.fecha}</td>
    </tr>
    `
  }
 }


const recetario = async()=> {
  const oliveOil = await fetch( 'https://api.edamam.com/api/recipes/v2/5deb035300431c30319d1f77afdefa89?type=public&app_id=9b95717f&app_key=7f03854bbb36f0f17aa38264128b9a78')
  .then((resp)=>resp.json())
  .then((data)=>{
    const receta = {
      label:data.recipe.label,
      images:data.recipe.images.REGULAR,
      recipe:data.recipe.ingredientLines,
      link:data.recipe.url,

    }
    return receta

  })

  const chickenLittle = await fetch( 'https://api.edamam.com/api/recipes/v2/49864e04de41a2512ee21919e26f482c?type=public&app_id=9b95717f&app_key=7f03854bbb36f0f17aa38264128b9a78')
  .then((resp)=>resp.json())
  .then((data)=>{
    const receta = {
      label:data.recipe.label,
      images:data.recipe.images.REGULAR,
      recipe:data.recipe.ingredientLines,
      link:data.recipe.url,
    }
    return receta
  })

  const squidInk = await  fetch( 'https://api.edamam.com/api/recipes/v2/1c0fd9a2dc4dbf64a7bbf4fe4c0bd310?type=public&app_id=9b95717f&app_key=7f03854bbb36f0f17aa38264128b9a78')
  .then((resp)=>resp.json())
  .then((data)=>{
    const receta = {
      label:data.recipe.label,
      images:data.recipe.images.REGULAR,
      recipe:data.recipe.ingredientLines,
      link:data.recipe.url,
    }
    return receta
  })
  const chipabasilero= await  fetch( 'https://api.edamam.com/api/recipes/v2/289e0b03ad7059c37420bfed928dd4af?type=public&app_id=9b95717f&app_key=7f03854bbb36f0f17aa38264128b9a78')
  .then((resp)=>resp.json())
  .then((data)=>{
    const receta = {
      label:data.recipe.label,
      images:data.recipe.images.REGULAR,
      recipe:data.recipe.ingredientLines,
      link:data.recipe.url,
    }
    return receta
  })
  const panisse= await fetch( 'https://api.edamam.com/api/recipes/v2/ab7b274349df0ce399cd05b5167d7052?type=public&app_id=9b95717f&app_key=7f03854bbb36f0f17aa38264128b9a78')
  .then((resp)=>resp.json())
  .then((data)=>{
    const receta = {
      label:data.recipe.label,
      images:data.recipe.images.REGULAR,
      recipe:data.recipe.ingredientLines,
      link:data.recipe.url,
    }
    return receta
  })

  const vinagre= await fetch('https://api.edamam.com/api/recipes/v2/38b7c878b2e5361007957ed8d2b0b803?type=public&app_id=9b95717f&app_key=7f03854bbb36f0f17aa38264128b9a78')
  .then((resp)=>resp.json())
  .then((data)=>{
    const receta = {
      label:data.recipe.label,
      images:data.recipe.images.REGULAR,
      recipe:data.recipe.ingredientLines,
      link:data.recipe.url,
    }
    return receta
  })

  const array=[oliveOil,chickenLittle,squidInk,chipabasilero,panisse,vinagre]

  const lista = document.getElementById("lista");
  array.forEach((post) => {
    const li = document.createElement('li')
    li.innerHTML = `
        <h4>${post.label}</h4>
        
    `
    lista.append(li)
})
}

recetario()