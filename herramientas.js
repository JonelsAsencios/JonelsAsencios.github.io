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
    descarga:    (opcional) archivo propio para descargar:
                 { archivo: "descargas/mi-programa.zip", tamano: "2 MB" }
    sitioOficial:(opcional) para herramientas de otros: { texto: "...", url: "..." }

  Los archivos para descargar van en la carpeta "descargas".
  Las herramientas de otras personas se enlazan a su sitio oficial
  en lugar de subir el archivo, para respetar su licencia y ofrecer
  siempre la versión más reciente.
*/
var HERRAMIENTAS = [
  {
    id: "nvda",
    nombre: "NVDA",
    tipo: "Lector de pantalla",
    plataforma: "Windows",
    propia: false,
    autor: "NV Access",
    fecha: "2026-10-10",
    resumen: "Lector de pantalla gratuito y de código abierto para Windows. Es el que recomiendo para empezar.",
    etiquetas: ["NVDA", "lector de pantalla", "Windows", "gratis"],
    contenido: `
      <p>NVDA (NonVisual Desktop Access) lee en voz alta lo que aparece en la pantalla de la computadora y también funciona con líneas Braille. Es gratuito y lo mantiene la organización NV Access.</p>
      <h2>Por qué lo recomiendo</h2>
      <ul>
        <li>Es gratuito y se actualiza con frecuencia.</li>
        <li>Funciona con la mayoría de programas, navegadores y con Office.</li>
        <li>Tiene muchos complementos creados por la comunidad.</li>
      </ul>
      <h2>Instalación</h2>
      <p>Descárgalo siempre desde su sitio oficial. Al abrir el instalador, NVDA empieza a hablar de inmediato para guiarte en la instalación.</p>
      <p>Para aprender los primeros atajos, revisa la publicación <a href="publicacion.html?id=atajos-basicos-nvda">Atajos básicos de NVDA para empezar</a>.</p>
    `,
    requisitos: ["Computadora con Windows 10 o superior"],
    sitioOficial: { texto: "Descargar NVDA desde su sitio oficial", url: "https://www.nvaccess.org/download/" }
  },
  {
    id: "osara-reaper",
    nombre: "OSARA para REAPER",
    tipo: "Extensión de accesibilidad",
    plataforma: "Windows y Mac",
    propia: false,
    autor: "James Teh y colaboradores",
    fecha: "2026-10-10",
    resumen: "Extensión gratuita que hace accesible el programa de producción musical REAPER con lectores de pantalla.",
    etiquetas: ["OSARA", "REAPER", "producción musical", "lector de pantalla"],
    contenido: `
      <p>OSARA es una extensión gratuita y de código abierto que permite usar REAPER, un programa de grabación y producción musical, con lectores de pantalla como NVDA o JAWS.</p>
      <h2>Qué permite</h2>
      <ul>
        <li>Escuchar el nombre de pistas, efectos y controles mientras navegas.</li>
        <li>Grabar, editar y mezclar usando atajos de teclado.</li>
        <li>Conocer la posición de reproducción y los niveles de volumen.</li>
      </ul>
      <h2>Instalación</h2>
      <p>Primero instala REAPER y luego OSARA, ambos desde sus sitios oficiales. Para saber cómo agregar efectos e instrumentos virtuales, revisa la publicación <a href="publicacion.html?id=que-es-un-plugin-vst">Qué es un plugin VST y cómo instalarlo</a>.</p>
    `,
    requisitos: ["REAPER 6.44 o superior", "Un lector de pantalla, como NVDA"],
    sitioOficial: { texto: "Ir al sitio oficial de OSARA", url: "https://osara.reaperaccessibility.com/" }
  }
];
