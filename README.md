# BOOK REVIEW APP

![Created](https://img.shields.io/badge/Created-May_2026-248f24)
![Version](https://img.shields.io/badge/Version-2.0-c42121)
![Made with](https://img.shields.io/badge/Made_with-JavaScript-255074)  <!-- REVISAR LENGUAJE-->

## :memo: Descripción

Backend de una aplicación en Express.js para reseñas de libros.

> Este proyecto fue elaborado como parte del curso IBM JavaScript Backend Developer

## :dart: Funcionalidades

- Login de usuario
- Autenticación de usuario por medio de tokens
- Registro de reseñas para un libro
- Visualización de la lista completa de libros registrados y sus reseñas
- Búsqueda de libros específicos según su título, autor o ISBN
- Creación, edición y eliminación de reseñas

### Acceso público
|MÉTODO  |ENDPOINT          |FUNCIÓN                                        |
|:------:|:-----------------|:----------------------------------------------|
|POST    | /register        | Registo de usuario nuevo                      |
|POST    | /customer/login  | Login para usuarios registrados               |
|GET     | /books           | Revisión de la lista de todos los libros      |
|GET     | /isbn/:isbn      | Revisión de un libro por su ISBN              |
|GET     | /author/:author' | Revisión de un libro por su autor             |
|GET     | /title/:title    | Revisión de un libro por su título            |
|GET     | /review/:isbn    | Revisión de reseñas de un libro por su ISBN   |

### Acceso con login
|MÉTODO     |ENDPOINT                      |FUNCIÓN                             |
|:---------:|:-----------------------------|:-----------------------------------|
|PUT        | /customer/auth/review/:isbn  | Creación o edición de una reseña   |
|DELETE     | /customer/auth/review/:isbn  | Eliminación una reseña             |

### Consideraciones
- La creación, edición y eliminación de reseñas requiere la autenticación del usuario por medio de un token
    - El token se genera al hacer el login
- Cada usuario sólo puede escribir una reseña para cada libro
- El usuario sólo puede editar y eliminar reseñas de su autoría
- Para fines de la demostración, la clave (ID) de los libros en la base de datos es considerada como su ISBN
- Sobre la creación de tokens:
    - Se utilizó el algoritmo HMAC-256
    - El tiempo de expiración se define en el archivo .env
- La base de datos ya tiene algunos libros pre-registrados. Para editarlos, abrir el archivo _/final\_project/database/booksdb.js_. La estructura de un libo es:
    - <_Número_>: {"author": "_Nombre Apellido_","title": "_Título del libro_", "reviews": {} }
    - _Reviews_ se deja como un objeto vacío


## :white_check_mark: Requisitos
- En la terminal, ejecutar el comando `npm install` para la instalación de los módulos de Node.js
    - Asegurarse de estar dentro de la carpeta _/final\_project_. En caso contrario, ejecutar el comando `cd final_project`
- Duplicar el archivo _.env.example_, renombrar a _.env_ y agregar las variables de entorno correspondientes:
    - ACCESS_KEY: Clave secreta para cifrar y descifrar los tokens
    - EXPIRATION_TIME= Tiempo de expiración de los tokens. Puede escribirse en segundos (ej. 60*60) o con un string (ej. 1h)
    - SESSION_KEY= Clave secreta para la sesión del usuario
    - URL= Dirección del servidor
    - PORT= Puerto del servidor
- Modificar la línea 8 en el archivo _swagger.json_ y escribir el host correspondiente
    - Ej. Si la URL es _http://localhost:1234_, entonces el host es _localhost:1234_

## :key: Acceso
Para probar los endpoints, ejecutar la aplicación (`npm start`), abrirla en el navegador (según la URL utilizada) y añadir a la ruta _/doc_

## :wave: Sobre mí
¡Hola! Soy Eugenia, programadora Backend en crecimiento. Empecé como profesora de matemáticas, pero mi interés por el desarrollo de software me llevó a formarme en tecnologías Backend.

Me entusiasma seguir aprendiendo, compartir mis conocimientos y poner mis habilidades al servicio de proyectos que aporten valor. ¿Empezamos?