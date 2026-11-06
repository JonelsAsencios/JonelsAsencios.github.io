/*
  =====================================================
  AQUÍ SE AGREGAN LAS ÁREAS Y LAS PUBLICACIONES
  =====================================================

  Para publicar algo nuevo, copia un bloque de PUBLICACIONES
  (desde la llave { hasta la llave } con su coma) y cambia:
    id:        nombre corto, sin espacios ni tildes (ej. "mi-nueva-guia")
    area:      el id del área (educacion, musica, produccion-musical,
               informatica-accesible, dispositivos-moviles, braille, programacion)
    titulo:    título de la publicación
    fecha:     año-mes-día (ej. "2026-11-05")
    resumen:   una o dos frases
    etiquetas: palabras clave para el buscador
    contenido: el texto, entre comillas invertidas ` `, usando
               <p> para párrafos, <h2> para subtítulos y <ul><li> para listas.
    youtube:   (opcional) código del video de YouTube, lo que va después de "v=" en el enlace.
               Ej.: para https://www.youtube.com/watch?v=abc123XYZ00 escribe "abc123XYZ00".
    tiktok:    (opcional) enlace completo del mismo video en TikTok.
    telegram:  (opcional) enlace de la publicación en tu canal de Telegram.
    medios:    (opcional) imágenes, audios y videos. Guarda los archivos en la
               carpeta "medios". Cada uno lleva:
                 tipo: "imagen", "audio" o "video"
                 archivo: ruta, por ejemplo "medios/mi-foto.jpg"
                 titulo: nombre corto
                 descripcion: OBLIGATORIA. Qué se ve o qué se escucha.
                 subtitulos: (solo video, opcional) archivo .vtt
*/

var AREAS = [
  {
    id: "educacion",
    nombre: "Educación",
    descripcion: "Materiales pedagógicos, sesiones de aprendizaje y estrategias para una enseñanza inclusiva."
  },
  {
    id: "musica",
    nombre: "Música",
    descripcion: "Instrumentos de cuerda, de percusión y de viento."
  },
  {
    id: "produccion-musical",
    nombre: "Producción musical accesible",
    descripcion: "Grabación, mezcla y producción con lectores de pantalla; software, VSTs y plugins accesibles."
  },
  {
    id: "informatica-accesible",
    nombre: "Informática accesible",
    descripcion: "Uso de la computadora con lectores de pantalla y herramientas de productividad."
  },
  {
    id: "dispositivos-moviles",
    nombre: "Dispositivos móviles",
    descripcion: "Manejo de celulares y tabletas con lectores de pantalla y aplicaciones útiles."
  },
  {
    id: "braille",
    nombre: "Sistema Braille",
    descripcion: "Sistema Braille, musicografía Braille y tecnología Braille."
  },
  {
    id: "programacion",
    nombre: "Programación",
    descripcion: "Introducción a la programación y desarrollo de herramientas y complementos accesibles."
  }
];

var PUBLICACIONES = [
];
