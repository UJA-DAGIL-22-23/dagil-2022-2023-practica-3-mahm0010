/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine
describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        });
});


// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

const datosTenistasPrueba = [
    {
    ref: {
        "@ref": {
            id: "ref tenista 1"
        }
    },
    data: {
        nombre: "Rafael",
        apellidos: "Nadal",
        fechaNac: {
            dia: 3,
            mes: 6,
            ano: 1986
          },
        partMundial: [2009, 2012, 2015],
        numMedallas: 3
    }
    },
    {
    ref: {
        "@ref": {
            id: "ref tenista 2"
        }
        },
    data:{
        nombre: "Novak",
        apellidos: "Djokovic",
        fechaNac: {
            dia: 22,
            mes: 5,
            ano: 1987
          },
        partMundial: [2009, 2012],
        numMedallas: 2
    }
    }
]


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.filtraVector: ", function () {
    let vector_prueba = []
    it("si se pasa un vector vacío el array que devuelve tiene tamaño 0",
        function () {
            vector_prueba = Plantilla.filtraVector(vector_prueba, "prueba")
            //console.log("si se pasa un vector vacío el array que devuelve tiene tamaño 0")
            //console.log(vector_prueba)
            expect(vector_prueba).toHaveSize(0)
    });

    it("Debería filtrar correctamente por nombre", () => {
      console.log("Debería filtrar correctamente por nombre")
      console.log(datosTenistasPrueba)
      expect(Plantilla.filtraVector(datosTenistasPrueba, "Rafael")).toEqual([{ref: {"@ref": {id: "ref tenista 1"}}, data: {nombre: "Rafael", apellidos: "Nadal", fechaNac: {dia: 3, mes: 6, ano: 1986}, partMundial: [2009, 2012, 2015], numMedallas: 3}}]);
    });

    it("Debería filtrar correctamente por apellidos", () => {
      //console.log("Debería filtrar correctamente por apellidos")
      //console.log(datosTenistasPrueba)
      expect(Plantilla.filtraVector(datosTenistasPrueba, "Djokovic")).toEqual([{ref: {"@ref": {id: "ref tenista 2"}}, data:{nombre: "Novak", apellidos: "Djokovic", fechaNac: {dia: 22, mes: 5, ano: 1987}, partMundial: [2009, 2012], numMedallas: 2}}]);
    });

    it("Debería filtrar correctamente por participaciones en mundiales", () => {
      //console.log("Debería filtrar correctamente por participaciones en mundiales")
      //console.log(datosTenistasPrueba)
      expect(Plantilla.filtraVector(datosTenistasPrueba, "2015")).toEqual([{ref: {"@ref": {id: "ref tenista 1"}}, data: {nombre: "Rafael", apellidos: "Nadal", fechaNac: {dia: 3, mes: 6, ano: 1986}, partMundial: [2009, 2012, 2015], numMedallas: 3}}]);
    });

    it("Debería filtrar correctamente por número de medallas", () => {
      //console.log("Debería filtrar correctamente por número de medallas")
      //console.log(datosTenistasPrueba)
      expect(Plantilla.filtraVector(datosTenistasPrueba, "3")).toEqual([{ref: {"@ref": {id: "ref tenista 1"}}, data: {nombre: "Rafael", apellidos: "Nadal", fechaNac: {dia: 3, mes: 6, ano: 1986}, partMundial: [2009, 2012, 2015], numMedallas: 3}}]);
    });

    it("Debería filtrar correctamente si no coincide ningún tenista con el criterio de búsqueda", () => {
      //console.log("Debería filtrar correctamente si no coincide ningún tenista con el criterio de búsqueda")
      //console.log(datosTenistasPrueba)
      expect(Plantilla.filtraVector(datosTenistasPrueba, "Daniel")).toEqual([]);
    });
})


describe("Pruebas para la función Plantilla.imprime()", function () {
  
    it("Comprueba que se ordena la tabla por nombre y que el nombre del primer tenista es alfabéticamente mayor que el segundo", function () {
        Plantilla.imprime(datosTenistasPrueba);
        const botonOrdenarNombre = document.querySelector("#ordenar-nombre");
        expect(botonOrdenarNombre).toBeDefined();
        spyOn(Array.prototype, "sort");
        botonOrdenarNombre.click();
        expect(Array.prototype.sort).toHaveBeenCalled();
        const tabla = document.querySelector(".listado-tenistas");
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const nombre1 = arrFilas[0].querySelector("td:first-child em").textContent;
        const nombre2 = arrFilas[1].querySelector("td:first-child em").textContent;
        expect(nombre1.localeCompare(nombre2) < 0).toBeTrue();
      });
      
  
    it("Comprueba que se ordena la tabla por apellidos y que el apellido del primer tenista es alfabéticamente mayor que el segundo", function () {
      Plantilla.imprime(datosTenistasPrueba);
      const botonOrdenarApellidos = document.querySelector("#ordenar-apellidos");
      expect(botonOrdenarApellidos).toBeDefined();
      spyOn(Array.prototype, "sort");
      botonOrdenarApellidos.click();
      expect(Array.prototype.sort).toHaveBeenCalled();
      const tabla = document.querySelector(".listado-tenistas");
      const filas = tabla.querySelectorAll("tbody tr");
      const arrFilas = Array.from(filas);
      const apellido1 = arrFilas[0].querySelector("td:nth-child(2) em").textContent;
      const apellido2 = arrFilas[1].querySelector("td:nth-child(2) em").textContent;
      expect(apellido1.localeCompare(apellido2) < 0).toBeTrue();
    });

    it("Comprueba que se ordena la tabla por fecha de nacimiento correctamente", function () {
        Plantilla.imprime(datosTenistasPrueba);
        const botonFechaNac = document.querySelector("#ordenar-fechaNac");
        expect(botonFechaNac).toBeDefined();
        spyOn(Array.prototype, "sort");
        botonFechaNac.click();
        expect(Array.prototype.sort).toHaveBeenCalled();
        const tabla = document.querySelector(".listado-tenistas");
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const fecha1 = arrFilas[0].querySelector("td:nth-child(3) em").textContent;
        const fecha2 = arrFilas[1].querySelector("td:nth-child(3) em").textContent;
        const fecha1Date = new Date(Date.parse(fecha1.split("/").reverse().join("-")));
        const fecha2Date = new Date(Date.parse(fecha2.split("/").reverse().join("-")));
        expect(fecha1Date.getTime() > fecha2Date.getTime()).toBeTrue();
      });

      it("Comprueba que se ordena la tabla por participaciones en mundiales correctamente", function () {
        Plantilla.imprime(datosTenistasPrueba);
        const botonPartMundial = document.querySelector("#ordenar-partMundial");
        expect(botonPartMundial).toBeDefined();
        spyOn(Array.prototype, "sort");
        botonPartMundial.click();
        expect(Array.prototype.sort).toHaveBeenCalled();
        const tabla = document.querySelector(".listado-tenistas");
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const partMundiales1 = arrFilas[0].querySelector("td:nth-child(4) em").textContent.split(',').length;
        const partMundiales2 = arrFilas[1].querySelector("td:nth-child(4) em").textContent.split(',').length;
        expect(partMundiales1 < partMundiales2).toBeTrue();
      });

      it("Comprueba que se ordena la tabla por número de medallas correctamente", function () {
        Plantilla.imprime(datosTenistasPrueba);
        const botonOrdenarMedallas = document.querySelector("#ordenar-numMedallas");
        expect(botonOrdenarMedallas).toBeDefined();
        spyOn(Array.prototype, "sort");
        botonOrdenarMedallas.click();
        expect(Array.prototype.sort).toHaveBeenCalled();
        const tabla = document.querySelector(".listado-tenistas");
        const filas = tabla.querySelectorAll("tbody tr");
        const arrFilas = Array.from(filas);
        const numMedallas1 = arrFilas[0].querySelector("td:nth-child(4) em").textContent;
        const numMedallas2 = arrFilas[1].querySelector("td:nth-child(4) em").textContent;
        expect(numMedallas1 < numMedallas2).toBeTrue();
      });
})

describe("Plantilla.cuerpoTr: ", function () {
    it("la tabla con el listado de los tenistas se genera correctamente",
      function () {
        let msj = Plantilla.cuerpoTr(datosTenistasPrueba[0])
            expect(msj.includes(datosTenistasPrueba[0].data.nombre)).toBeTrue();
            expect(msj.includes(datosTenistasPrueba[0].data.apellidos)).toBeTrue();
            expect(msj.includes(datosTenistasPrueba[0].data.fechaNac.dia)).toBeTrue();
            expect(msj.includes(datosTenistasPrueba[0].data.fechaNac.mes)).toBeTrue();
            expect(msj.includes(datosTenistasPrueba[0].data.fechaNac.ano)).toBeTrue();
            expect(msj.includes(datosTenistasPrueba[0].data.partMundial[0])).toBeDefined();
            expect(msj.includes(datosTenistasPrueba[0].data.numMedallas)).toBeTrue();
      })
  })

  describe("Plantilla.cabeceraTable", function() {
    it("debería contener un th para el nombre", function() {
      expect(Plantilla.cabeceraTable()).toContain('<th><a href="#" id="ordenar-nombre">Nombre</a></th>');
    });
  
    it("debería contener un th para los apellidos", function() {
      expect(Plantilla.cabeceraTable()).toContain('<th><a href="#" id="ordenar-apellidos">Apellidos</a></th>');
    });
  
    it("debería contener un th para la fecha de nacimiento", function() {
      expect(Plantilla.cabeceraTable()).toContain('<th><a href="#" id="ordenar-fechaNac">Fecha de nacimiento</a></th>');
    });
  
    it("debería contener un th para las participaciones mundiales", function() {
      expect(Plantilla.cabeceraTable()).toContain('<th><a href="#" id="ordenar-partMundial">Participaciones mundiales</a></th>');
    });
  
    it("debería contener un th para el número de medallas", function() {
      expect(Plantilla.cabeceraTable()).toContain('<th><a href="#" id="ordenar-numMedallas">Número de medallas</a></th>');
    });
  
    it("debería contener un th para las acciones", function() {
      expect(Plantilla.cabeceraTable()).toContain('<th>Acciones</th>');
    });
    it("debería contener un div con el formulario de búsqueda", function() {
      expect(Plantilla.cabeceraTable()).toContain('<div>');
      expect(Plantilla.cabeceraTable()).toContain('<label for="busqueda">Buscar:</label>');
      expect(Plantilla.cabeceraTable()).toContain('<input type="text" id="busqueda" name="busqueda">');
      expect(Plantilla.cabeceraTable()).toContain('<button onclick="Plantilla.buscar()">Buscar</button>');
      expect(Plantilla.cabeceraTable()).toContain('</div>');
    });
  });
  
  describe("Plantilla.pieTable", function() {
    it("debería contener el pie de la tabla", function() {
      expect(Plantilla.pieTable()).toContain('</tbody></table>');
    });
  });

  describe("Plantilla.imprimeUnTenista: ", function () {
    it("mostrar todos los tipos de datos de un tenista", function () {
        const tenista = datosTenistasPrueba[0];
        const fechaNac = `${tenista.data.fechaNac.dia}/${tenista.data.fechaNac.mes}/${tenista.data.fechaNac.ano}`;
        const partMundial = tenista.data.partMundial.join(", ");
        Plantilla.imprime(datosTenistasPrueba);
        Plantilla.imprimeUnTenista(tenista, 0, 1)
        expect(elementoContenido.innerHTML).toContain(`<tr><th>Nombre</th><td>${tenista.data.nombre}</td></tr>`)
        expect(elementoContenido.innerHTML).toContain(`<tr><th>Apellidos</th><td>${tenista.data.apellidos}</td></tr>`)
        expect(elementoContenido.innerHTML).toContain(`<tr><th>Fecha Nacimiento</th><td>${fechaNac}</td></tr>`)
        expect(elementoContenido.innerHTML).toContain(`<tr><th>Participaciones en mundiales</th><td>${partMundial}</td></tr>`)
        expect(elementoContenido.innerHTML).toContain(`<tr><th>Número de medallas</th><td>${tenista.data.numMedallas}</td></tr>`)
      });
    
    it("la función imprimeUnTenista recibe los parámetros necesarios (3)", function (){
      expect(Plantilla.imprimeUnTenista.length).toEqual(3);
    });
  });
  

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
