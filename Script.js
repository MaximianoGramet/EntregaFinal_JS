function Inicio(){
alert("Buenos días y bienvenidos");
let menu=prompt("¿Qué es lo que necesita?\n 1_Reservación\n 2_Busqueda de Cliente");

switch(menu){
  case '1':
    let saludo= prompt("¿Cuantos Invitados nos visitaran? (1-8)");
    while(saludo<1||saludo>8){
      alert("cantidad de Invitados no valida");
      saludo= prompt("¿Cuantos Invitados nos visitaran?(1-8)");
    }
    console.table(clientes);
    let bucle ="si";
    let ubicacion=0;
  while(bucle=="si"){
    //ubicación
    let ubicacion=0;
    let lugar ="default";
    let multiplicador=1;
    while(ubicacion==0){
      ubicacion=prompt("¿Donde le gustaría pasar su estadía? \n 1° Ventana.  \n 2° Entrada. \n 3° Escenario. \n 4° Disponible. \n (Escriba un número)");
  
      switch(ubicacion){
        case "0":
          alert("no ha seleccionado una opción, intente nuevamente");
          break;
        case "1":
          alert("Usted reservo una mesa junto a la ventana para "+ saludo +" personas, esperamos que disfrute" );
          ubicacion=1;
          lugar ="junto a la ventana";
          break;
        case "2":
          alert("Usted reservo una mesa junto a la Entrada para "+ saludo +" personas, esperamos que disfrute" );
          ubicacion=1;
          lugar ="junto a la entrada";
          multiplicador=0.9;
          break;
        case "3":
          alert("Usted reservo una mesa junto al Escenario para "+ saludo +" personas, esperamos que disfrute" );
          ubicacion=1;
          lugar ="junto al escenario";
          multiplicador=1.2;
          break;
        case "4":
          alert("Usted reservo cualquier mesa que esté disponible para "+ saludo +" personas, esperamos que disfrute" );
          ubicacion=1;
          lugar ="donde haya lugar";
          multiplicador=0.75;
          break;
        default:
          alert("La opcion que usted selecciono no es valida, intente nuevamente")
          ubicacion=0;
          break;
      }
    }
    //costo cubiertos y otros (sería el costo del show etc)
    let servicio=(200+5*saludo)*multiplicador;
    //fecha
    let mes=prompt("Ingrese el mes de su visita (1-12)");
    let dia=0;
    let alerta=0;
    while(mes<1 || mes>12){
      alert("mes no valido");
      mes=prompt("Ingrese el mes de su visita (1-12)");
    }
    if(mes==2){
      while (dia<1 || dia>28){
        if(alerta>0){
          alert("Día no valido, reintente");
          dia=prompt("Ingrese el día de su visita (1-28)");
        }
        alerta+=1;
      }
    }else if(mes==4||mes==6||mes==9||mes==11){
      while (dia<1||dia>30){
        if(alerta>0){
          alert("Día no valido, reintente");
        } else
        dia=prompt("Ingrese el día de su visita (1-30)");
        alerta+=1;
      }   
    }else{
      while (dia<1||dia>31){
        if(alerta>0){
          alert("Día no valido, reintente");
        }
        dia=prompt("Ingrese el día de su visita (1-31)");
        alerta+=1;
      }
    }
    //celiaquismo
    let celiaquismo="default"
    while(celiaquismo !="no" && celiaquismo!="si"){
      if(celiaquismo!="default"){
        alert("opción no valida");
      }
      celiaquismo=prompt("¿requiere de menu celiaco? (si-no)");
      celiaquismo=celiaquismo.toLowerCase();
    }
  //no importa la cantidad, porque en los restaurantes
  // lo que importa es tener la cocina para celicos lista, no la cantidad de platos
  celiaquismo=celiaquismo.toLowerCase();
  //Resumen
  alert("Pedido finalizado, a continuación los detalles de su pedido:");
  alert("Ubicación: "+lugar+"\n Fecha: "+dia+"/"+mes+"\n Require menu celiaco: "+celiaquismo);
  alert("Su reservacion fue registrada con exito");
  let chequeo=0;
  while(chequeo==0){
      let confirmacion=prompt("¿desea reservar otra mesa?\n (si-no)");
      confirmacion=confirmacion.toLocaleLowerCase();
      if(confirmacion=="no"){
        bucle="no";
        chequeo=1;
      }else if(confirmacion=="si"){
        bucle="si";
        chequeo=1;
      }else{
        alert("respuesta no valida, vuelva a intentar");
      }
    }
  
  }
  break;
  case '2':
    //Usado por empleados para chequear detalles de resevación WIP
    alert("Usted selecciono la busqueda de cliente");
    let busqueda=prompt("Ingrese el ID o Nombre del cliente a buscar");
    let resulado = clientes.filter((el)=>el.id==busqueda);
    if(resulado==undefined){
      resulado = clientes.filter((el)=>el.Nombre==busqueda);
    }
    if(resulado==undefined){
      alert("No hubo resultados a la busqueda de "+busqueda);
    }else{
      alert("Se encontro el/los siguiente/s resultado/s");

      console.log(resulado)
      let i=0;
      resulado.forEach(element =>  {

        alert("Nombre:"+resulado[i].Nombre+"\nUbicación:"+resulado[i].lugar+"\nCantidad:"+resulado[i].cantidad+"\nFecha:"+resulado[i].fecha);
        i=+1;
      });
    }
    

  break;
  default:
    alert("Opción no valida");
    break;
}
alert("Gracias por visitarnos");
}