# Prueba Técnica

¡Hola! Gracias por la oportunidad. Aquí te dejo mi implementación de la prueba técnica.

## Descripción del Proyecto

Este proyecto fue realizado utilizando **Expo** y **TypeScript**.

Me tomé la libertad de descargar imágenes para los planetas y las películas, únicamente por razones visuales, ya que la **SwApi** no proporciona imágenes. No descargué imágenes de las personas, ya que era más difícil encontrar consistencia en ellas.

### Requerimientos y Características

He considerado todos los puntos mencionados en el correo, tanto los requeridos como los opcionales, con la excepción de **documentar el uso de la aplicación**.

Algunas de las características principales incluyen:

- **Cambio de tema**: Se implementó la opción de cambiar de tema utilizando **Redux**.
- **Traducción al español**: Los modelos de datos de la API han sido traducidos al español.
- **Patrón Atomic Design**: Se ha utilizado el patrón **Atomic Design** en la estructuración de los componentes.

### Funcionalidad de la Aplicación

La aplicación consiste en una pantalla inicial que recibe al usuario y lo lleva al **Home**. En el **Home**, se muestran tres widgets que representan:
1. Planetas
2. Personas
3. Películas

Cada uno de estos widgets es interactivo, lo que permite al usuario tocar sobre ellos y acceder a una pantalla con información detallada. Además, en cada una de estas pantallas, el usuario puede visitar la página de detalles de los ítems.

- **Ver más**: Al pulsar el botón "Ver más" de los dos primeros widgets (Planetas y Personas), el usuario será redirigido a una pantalla que muestra la lista completa de los elementos, con **paginación** y **opción de búsqueda** tanto para planetas como para personas.

### Pruebas Unitarias

Las pruebas unitarias son limitadas, ya que no tenía experiencia previa implementándolas. Sin embargo, el proyecto me sirvió como excusa para investigar e introducirme en su implementación. Aunque las pruebas son básicas, espero que sean suficientes para demostrar la funcionalidad del código.


¡Espero que te guste el proyecto y quedo atento a cualquier comentario o pregunta!
