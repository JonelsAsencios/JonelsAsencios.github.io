/*
  =====================================================
  NOVEDADES: anuncios cortos (talleres, clases, eventos,
  materiales nuevos, cambios en la página...)
  =====================================================

  Para agregar una novedad, copia un bloque (desde la llave {
  hasta la llave } con su coma), ponlo al inicio de la lista y cambia:
    id:     nombre corto, sin espacios ni tildes (ej. "taller-nvda-noviembre")
    fecha:  año-mes-día (ej. "2026-11-05")
    titulo: título corto
    texto:  el anuncio, entre comillas invertidas ` `. Usa <p> para cada párrafo.
    enlace: (opcional) { texto: "Texto del enlace", url: "dirección" }
            Para enlazar a una publicación: "publicacion.html?id=id-de-la-publicacion"
*/
var NOVEDADES = [
  {
    id: "estreno-pagina-web",
    fecha: "2026-10-10",
    titulo: "¡Estrenamos página web!",
    texto: `
      <p>Bienvenidas y bienvenidos a mi nueva página. Aquí compartiré publicaciones sobre educación, música, producción musical accesible, informática accesible, uso del celular con lectores de pantalla, sistema Braille y programación.</p>
      <p>La página está pensada para ser accesible: puedes escuchar cada publicación en voz alta, agrandar la letra, activar el alto contraste y usar los reproductores con atajos de teclado.</p>
    `,
    enlace: { texto: "Explorar las áreas", url: "index.html#areas" }
  }
];
