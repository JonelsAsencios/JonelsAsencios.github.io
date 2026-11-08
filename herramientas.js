/*
  =====================================================
  HERRAMIENTAS: programas, aplicaciones y complementos
  que desarrollo o que recomiendo.
  =====================================================

  Para agregar una herramienta, copia un bloque (desde la llave {
  hasta la llave } con su coma) y cambia:
    id:          nombre corto, sin espacios ni tildes (ej. "reproductor-jieshuo")
    nombre:      nombre de la herramienta
    tipo:        por ejemplo "Aplicación Android", "Programa para Windows",
                 "Complemento para NVDA", "Plugin para Jieshuo", "Plugin VST"
    plataforma:  "Windows", "Android", "Windows y Mac", etc.
    propia:      true si la desarrollaste tú; false si es de otra persona o empresa
    autor:       (solo si no es propia) quién la creó
    estado:      (opcional) "En desarrollo" mientras no esté lista para descargar
    version:     (opcional) por ejemplo "1.2"
    fecha:       año-mes-día de la última actualización
    resumen:     una frase para la lista
    contenido:   explicación completa entre comillas invertidas ` `
                 (qué hace, cómo instalarla, cómo usarla). Usa <p>, <h2>, <ul><li>.
    requisitos:  (opcional) lista de requisitos, ej. ["Android 10 o superior"]
    descargas:   (opcional) varias versiones: [{ texto: "Versión de 64 bits", archivo: "enlace", tamano: "77 MB" }, ...]
    ayudaDescarga: (opcional) texto para ayudar a elegir la versión.
    descarga:    (opcional) archivo para descargar:
                 { archivo: "enlace del mensaje de Telegram con el archivo", tamano: "2 MB" }
                 También puede ser un archivo de la carpeta "descargas" (hasta 100 MB).
    oculto:      true mientras no quieras que se vea en la página (bórralo para publicarla)
    sitioOficial:(opcional) para herramientas de otros: { texto: "...", url: "..." }

  Los archivos para descargar van en la carpeta "descargas".
  Las herramientas de otras personas se enlazan a su sitio oficial
  en lugar de subir el archivo, para respetar su licencia y ofrecer
  siempre la versión más reciente.
*/
var HERRAMIENTAS = [
  {
    id: "estudio-jonels",
    nombre: "Estudio Jonels",
    tipo: "Aplicación Android",
    plataforma: "Android 7 o superior",
    propia: true,
    version: "1",
    fecha: "2026-11-08",
    resumen: "Reproductor, modo lectura y editor multipista accesible para Android: para escuchar, leer, grabar, editar y producir música con lector de pantalla.",
    etiquetas: ["Estudio Jonels", "Android", "reproductor", "editor multipista", "producción musical", "lector de pantalla", "MIDI", "APK"],
    contenido: `
      <p>Estudio Jonels es mi aplicación para Android. Reúne en un solo lugar un reproductor de audio y video, un modo lectura para documentos y un editor multipista para grabar, editar y producir música. Todo está pensado para usarse con lector de pantalla.</p>
      <h2>Lo que puedes hacer</h2>
      <ul>
        <li>Reproductor de audio y video con controles grandes y fijos, velocidad, tono, volumen, ecualizador, normalizador, marcadores, tramos, recorte y fundidos. Abre casi cualquier formato, también las notas de voz de WhatsApp y Telegram.</li>
        <li>Archivos por carpetas en todas las memorias, favoritos, compartir con los cambios aplicados, convertir audio, video y fotos, y comprimir.</li>
        <li>Editor multipista de hasta 64 pistas de audio, MIDI e imagen, con grabación como en REAPER, metrónomo, marcadores, cambios de tempo y de compás, carpetas, envíos y pista master.</li>
        <li>Efectos por pista: ecualizador, filtros, compresor, limitador, eco, reverberación, chorus, distorsión, flanger y más, autotune y karaoke.</li>
        <li>Teclados MIDI por cable o Bluetooth, arpegiador, mapeo MIDI e instrumentos virtuales: SoundFont SF2 y SF3, SFZ, Decent Sampler y tus propias muestras.</li>
        <li>Exporta en audio, video, proyecto de REAPER, MIDI y partitura MusicXML.</li>
        <li>Lee en voz alta textos y documentos: Word, PDF, EPUB, PowerPoint, Excel, HTML, RTF y más, con un modo lectura que sigue a la voz y edición como en un procesador de textos.</li>
        <li>Reconocimiento de texto en fotos y PDF escaneados, y audiodescripción de fotos y videos.</li>
        <li>Separación de pistas sin internet y transmisión en vivo a YouTube, Facebook, TikTok, Instagram y Twitch.</li>
        <li>Atajos de teclado, gestos y botones configurables. Pensada para TalkBack, Jieshuo y otros lectores de pantalla, con opciones para baja visión.</li>
      </ul>
      <h2>Cómo instalarla</h2>
      <ol>
        <li>Pulsa el botón de descarga. Se abrirá mi canal de Telegram en el mensaje con el archivo. Elige la versión de 64 bits, salvo que tu celular sea antiguo. Pesa unos 77 MB, así que te conviene usar wifi.</li>
        <li>Descarga el archivo desde Telegram y ábrelo.</li>
        <li>Si Android te pide permiso para instalar aplicaciones de fuentes desconocidas, actívalo para tu navegador o tu gestor de archivos.</li>
        <li>Pulsa Instalar y luego Abrir.</li>
        <li>La primera vez, acepta los permisos de música y videos y de notificaciones.</li>
      </ol>
      <p>Dentro de la aplicación, en Sobre mí, encontrarás la guía de uso completa, organizada por encabezados.</p>
      <h2>Compartir</h2>
      <p>Puedes compartir libremente el archivo de instalación oficial. No se permite copiar, modificar ni vender la aplicación o su código sin autorización.</p>
    `,
    requisitos: ["Celular o tableta con Android 7 o superior", "Unos 200 MB libres para instalarla"],
    oculto: true,
    descargas: [
      { texto: "Versión de 64 bits (recomendada)", archivo: "", tamano: "77 MB" },
      { texto: "Versión de 32 bits, para celulares antiguos", archivo: "", tamano: "69 MB" }
    ],
    ayudaDescarga: "La mayoría de celulares de los últimos años son de 64 bits. Si no sabes cuál es el tuyo, descarga primero la de 64 bits; si Android dice que no se puede instalar, usa la de 32 bits."
  }
];
