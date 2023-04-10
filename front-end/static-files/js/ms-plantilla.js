/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};


/**
 * Función que recupera todos los tenistas llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los tenistas que se han descargado
    let vectorTenistas = null
    if (response) {
        vectorTenistas = await response.json()
        callBackFn(vectorTenistas.data)
    }
}




// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTable = function () {
    return `<table class="listado-tenistas">
        <thead>
        <th>Nombre</th>
        <th>Acciones</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada tenista en un elemento TR con sus correspondientes TD
 * @param {tenista} t Datos del tenista a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el tenista.
 */
Plantilla.cuerpoTr = function (t) {
    const d = t.data;
    console.log(t);
    return `<tr title="${t.ref['@ref'].id}">
    <td><em>${d.nombre}</em></td>
    <td>
        <div><a href="javascript:Plantilla.mostrar('${t.ref['@ref'].id}')" class="opcion-secundaria mostrar">Mostrar</a></div>
    </td>
    </tr>
    `;
}

/**
 * Pie de la tabla en la que se muestran los tenistas
 * @returns Cadena con el pie de la tabla
 */
Plantilla.pieTable = function () {
    return "</tbody></table>";
}




/**
 * Función para mostrar en pantalla todos los tenistas que se han recuperado de la BBDD.
 * @param {Vector_de_tenistas} vector Vector con los datos de los tenistas a mostrar
 */
Plantilla.imprime = function (vector) {
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de tenistas", msj )

}

/**
 * Función principal para recuperar los tenistas desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listar = function () {
    this.recupera(this.imprime);
}

/**
 * Función principal para mostrar los datos de un tenista desde el MS y, posteriormente, imprimirlo.
 * @param {String} idTenista Identificador del tenista a mostrar
 */
Plantilla.mostrar = function (idTenista) {
    this.recuperaUnTenista(idTenista, this.imprimeUnTenista);
}

/**
 * Función que recupera un tenista llamando al MS Plantilla. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idTenista Identificador del tenista a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaUnTenista = async function (idTenista, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idTenista
        const response = await fetch(url);
        if (response) {
            const tenista = await response.json()
            callBackFn(tenista)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway al recuperar un tenista")
        console.error(error)
    }
}

/**
 * Función para mostrar en pantalla los datos del tenista recuperado.
 * @param {Tenista} tenista Datos del tenista a mostrar
 */
Plantilla.imprimeUnTenista = function (tenista) {
    console.log( tenista ) // Para comprobar lo que hay en tenista
    const fechaNac = `${tenista.data.fechaNac.dia}/${tenista.data.fechaNac.mes}/${tenista.data.fechaNac.ano}`;
    const partMundial = tenista.data.partMundial.join(", ");
    let msj = "";
    msj += `<table class="listado-tenistas">
            <tbody>
                <tr><th>Nombre</th><td>${tenista.data.nombre}</td></tr>
                <tr><th>Apellidos</th><td>${tenista.data.apellidos}</td></tr>
                <tr><th>Fecha Nacimiento</th><td>${fechaNac}</td></tr>
                <tr><th>Participaciones en mundiales</th><td>${partMundial}</td></tr>
                <tr><th>Número de medallas</th><td>${tenista.data.numMedallas}</td></tr>
            </tbody>
        </table>`;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Detalle de tenista", msj )
}





// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}



