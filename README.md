[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hneiFYl3)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10794664&assignment_repo_type=AssignmentRepo)
# *Práctica Microservicios*: documentación.
## Datos personales
### Miguel Ángel Hurtado Molina
* **Correo**: mahm0010@red.ujaen.es
* **Trello**: https://trello.com/b/OOEmBgrZ/pr%C3%A1ctica-3-desarrollo-%C3%A1gil

## Base de datos de Fauna
### Home![Alt text](assets/img/home-fauna.png)
### Página en la que aparece la base de datos ![Alt text](assets/img/pagina-bd.png)
### Página en la que aparece la colección ![Alt text](assets/img/pagina-coleccion.png)

### Documentos creados en la colección
```js
{
  nombre: "Daniel",
  apellidos: "Hernandez",
  fechaNac: {
    dia: 4,
    mes: 3,
    ano: 1980
  },
  partMundial: [2004, 2008, 2012],
  numMedallas: 1
}

{
  nombre: "Paco",
  apellidos: "Hidalgo",
  fechaNac: {
    dia: 6,
    mes: 8,
    ano: 1979
  },
  partMundial: [2000, 2004, 2008, 2012],
  numMedallas: 2
}

{
  nombre: "Maria",
  apellidos: "Gonzalez",
  fechaNac: {
    dia: 21,
    mes: 5,
    ano: 1995
  },
  partMundial: [2018, 2021],
  numMedallas: 2
}

{
  nombre: "Antonio",
  apellidos: "Rodriguez",
  fechaNac: {
    dia: 12,
    mes: 9,
    ano: 1990
  },
  partMundial: [2012, 2016, 2020],
  numMedallas: 3
}

{
  nombre: "Laura",
  apellidos: "Sanchez",
  fechaNac: {
    dia: 14,
    mes: 2,
    ano: 1998
  },
  partMundial: [2019, 2022],
  numMedallas: 0
}

{
  nombre: "Jorge",
  apellidos: "Gomez",
  fechaNac: {
    dia: 30,
    mes: 8,
    ano: 1987
  },
  partMundial: [2009, 2013, 2017],
  numMedallas: 1
}

{
  nombre: "Carmen",
  apellidos: "Lopez",
  fechaNac: {
    dia: 2,
    mes: 12,
    ano: 1991
  },
  partMundial: [2014, 2018, 2022],
  numMedallas: 2
}

{
  nombre: "Diego",
  apellidos: "Fernandez",
  fechaNac: {
    dia: 11,
    mes: 6,
    ano: 1989
  },
  partMundial: [2011, 2015, 2019],
  numMedallas: 0
}

{
  nombre: "Sofia",
  apellidos: "Martinez",
  fechaNac: {
    dia: 7,
    mes: 4,
    ano: 1994
  },
  partMundial: [2017, 2021],
  numMedallas: 1
}

{
  nombre: "Manuel",
  apellidos: "Ruiz",
  fechaNac: {
    dia: 23,
    mes: 11,
    ano: 1992
  },
  partMundial: [2013, 2018, 2022],
  numMedallas: 3
}
```

## Incremento 1
Para el primer incremento he implementado las funcionalidades 1, 2 y 6.

Para ello empecé creando las correspondientes tarjetas en el tablero de Trello:![Alt text](assets/img/trello-incremento1.png)

A continuación fui implementando las tres funcionalidades.

1:![Alt text](assets/img/funcionalidad-1.png)
2:![Alt text](assets/img/funcionalidad-2.png)
6:![Alt text](assets/img/funcionalidad-6.png)

Así, tras pasar todas las pruebas que había programado previamente y revisar el correcto funcionamiento de las funcionalidades, queda terminado mi primer incremento.

Así queda el tablero de Trello al final:![Alt text](assets/img/trello-incremento1-done.png)


## Incremento 2
Para el segundo incremento decidí implementar las funcionalidades 3, 4 y 5:![Alt text](assets/img/trello-incremento2.png)

Comencé con la número **3**, modificando la tabla con el listado de tenistas implementada anteriormente:![Alt text](assets/img/funcionalidad-3.png)

A continuación empecé a incluir el resto de datos de los tenistas en la tabla tal y como pide la funcionalidad número **4**:![Alt text](assets/img/funcionalidad-4.png)

Por último añadí la funcionalidad número **5** de forma que al pulsar con el ratón sobre el nombre de cualquiera de las columnas de la tabla con datos sobre el tenista, esta se ordenara de forma ascendente o descendente en función del dato que almacene dicha columna: Alfabéticamente en el caso del nombre o los apellidos, numéricamente en el caso de participaciones en mundiales o número de medallas y temporalmente en el caso de la fecha de nacimiento:![Alt text](assets/img/funcionalidad-5.png)![Alt text](assets/img/funcionalidad-5.1.png)![Alt text](assets/img/funcionalidad-5.2.png)![Alt text](assets/img/funcionalidad-5.3.png)![Alt text](assets/img/funcionalidad-5.4.png)

Una vez implementadas y comprobadas todas las funcionalidades, las marqué como completadas en el tablero de Trello finalizando así mi segundo incremento:![Alt text](assets/img/trello-incremento2-done.png)

## Incremento 3
Para el tercer incremento decidí implementar las funcionalidades 7, 8 y 9:![Alt text](assets/img/trello-incremento3.png)

Empecé a trabajar en la número **7**. Para ello añadí dos nuevos botones que se renderizarían tan solo si se cumplía una condición que comprobaba si había un tenista anterior o siguiente en el listado. De esta forma, si se presiona uno de los dos botones se mostrarán los datos del tenista correspondiente de la misma forma que en la función mostrar de la funcionalidad 6:

Aquí podemos ver el primer tenista:
![Alt text](assets/img/funcionalidad-7.1.png)
El segundo:
![Alt text](assets/img/funcionalidad-7.2.png)
Y el último:
![Alt text](assets/img/funcionalidad-7.3.png)

Una vez comprobado el correcto funcionamiento de esta funcionalidad, me puse a trabajar en la **8**. Para ella, coloqué un nuevo formulario y botón encima de la tabla del listado de los tenistas creado en el primer incremento. En él, podremos introducir el dato a buscar de los tenistas. Tras ello, implementé el código necesario para que cuando se presione el botón de buscar al lado del formulario, se busque en el listado los tenistas cuyo nombre coincida con el introducido. Esto lo hago realizando un filtrado del vector de tenistas, de forma que se devuelve un vector con tan solo los tenistas que cumplan el criterio de búsqueda introducido, y por tanto este es el vector que se listará al presionar el botón:

Introducimos el nombre a buscar:![Alt text](assets/img/funcionalidad-8.1.png)

Y presionamos el botón, obteniendo el nuevo listado ya filtrado con los tenistas cuyo nombre sea el introducido en la búsqueda:![Alt text](assets/img/funcionalidad-8.2.png)

Por último, para la funcionalidad número **9**, debía modificar el código de la anterior para poder filtrar el listado con diferentes datos de los tenistas. Escogí los campos apellidos, participaciones en mundiales y número de medallas.

Para los apellidos funciona igual que el nombre:
![Alt text](assets/img/funcionalidad-9.1.png)![Alt text](assets/img/funcionalidad-9.2.png)

Para el campo de participaciones en mundiales, podremos buscar uno de los años y nos devolverá todos los tenistas que hayan participado en el mundial de dicho año:
![Alt text](assets/img/funcionalidad-9.3.png)![Alt text](assets/img/funcionalidad-9.4.png)

Y de forma parecida, podemos buscar un número de medallas y obtendremos un listado con los tenistas que tengan ese mismo número de medallas:
![Alt text](assets/img/funcionalidad-9.5.png)![Alt text](assets/img/funcionalidad-9.6.png)

El nuevo listado que se obtiene tras una búsqueda tiene las mismas funcionalidades que el principal, de forma que podemos ver los detalles completos de los tenistas así como recorrerlo con los botones anterior y siguiente:
![Alt text](assets/img/funcionalidad-9.7.png) ![Alt text](assets/img/funcionalidad-9.8.png) ![Alt text](assets/img/funcionalidad-9.9.png)

De esta forma, quedan completadas mis funcionalidades escogidas para el tercer incremento:
![Alt text](assets/img/trello-incremento3-done.png)