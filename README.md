# Página de Jonels Asencios

Sitio personal accesible: educación, música, producción musical, tecnología accesible y sistema Braille.

Dirección: https://jonelsasencios.com

## Archivos

- index.html: página de inicio (áreas, publicaciones recientes, herramientas, novedades, sobre mí y contacto).
- area.html: página de cada área; muestra sus publicaciones.
- publicacion.html: muestra una publicación completa.
- buscar.html: resultados del buscador.
- herramientas.html y herramienta.html: lista y detalle de programas, aplicaciones y complementos.
- contacto.html: formulario de contacto.
- suscribete.html: formulario de suscripción con el contador de suscriptores.
- novedades.html: todas las novedades (anuncios de talleres, clases, eventos y materiales nuevos).
- publicaciones.js: aquí están las áreas y todas las publicaciones. Es el único archivo que hay que editar para publicar.
- configuracion.js: servicio de vistas y opiniones (GoatCounter) y correo de los formularios.
- herramientas.js: aquí se agregan las herramientas (instrucciones al inicio del archivo).
- descargas/: archivos de las herramientas propias para descargar (hasta 100 MB cada uno).
- novedades.js: aquí se agregan las novedades (instrucciones al inicio del archivo).
- comentarios.js: comentarios aprobados que se muestran en la página.
- medios/: imágenes, audios y videos de las publicaciones.
- estadisticas.html: página privada "Mis estadísticas" (no aparece en el menú; pide la clave de GoatCounter).
- sitio.js: cabecera, buscador, opciones de lectura y armado de las páginas.
- estilos.css: colores y diseño.

## Cómo agregar una publicación

1. Abre publicaciones.js.
2. Copia uno de los bloques de la lista PUBLICACIONES, desde la llave de apertura hasta la llave de cierre con su coma.
3. Cambia id, area, titulo, fecha, resumen, etiquetas y contenido. Las instrucciones están al inicio del archivo.
4. Si la publicación tiene imagen, audio o video, súbelo a la carpeta medios y agrégalo en "medios", siempre con su descripción.
5. Guarda. La publicación aparecerá sola en su área, en las recientes y en el buscador.

## Comentarios

Los comentarios llegan a tu correo. Solo se publican los que agregues a comentarios.js
(las instrucciones están al inicio del archivo). Los comentarios con palabras ofensivas
se bloquean antes de enviarse.

## Formulario de contacto

Los mensajes se envían a contacto@jonelsasencios.com mediante FormSubmit y Cloudflare los reenvía a tu Gmail. La primera vez que
alguien envíe un mensaje, FormSubmit te enviará un correo de activación: ábrelo y confirma.

## Suscriptores

En la página de inicio hay un botón "Suscribirme" que lleva a suscribete.html. Cada suscripción llega a tu correo
con el nombre, el correo, los temas que le interesan y la fecha y hora de Lima.
Guarda esos correos (por ejemplo con una etiqueta "Suscriptores" en Gmail): esa es tu lista.
El contador público solo muestra cuántas personas se suscribieron, sin nombres ni correos.
