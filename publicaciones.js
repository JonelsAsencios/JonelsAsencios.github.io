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
  {
    id: "planificar-sesion-accesible",
    area: "educacion",
    titulo: "Cómo planificar una sesión de aprendizaje accesible",
    fecha: "2026-10-10",
    resumen: "Ideas sencillas para que todos tus estudiantes puedan participar desde el inicio de la clase.",
    etiquetas: ["sesión de aprendizaje", "inclusión", "planificación"],
    contenido: `
      <p>Una sesión accesible se piensa desde el principio para todos los estudiantes, no se adapta al final.</p>
      <h2>Antes de la clase</h2>
      <ul>
        <li>Prepara los materiales en formatos digitales que funcionen con lector de pantalla.</li>
        <li>Ten disponible una versión en Braille o en audio de las lecturas principales.</li>
      </ul>
      <h2>Durante la clase</h2>
      <ul>
        <li>Describe en voz alta todo lo que escribas o muestres.</li>
        <li>Da instrucciones claras y en pasos cortos.</li>
      </ul>
    `
  },
  {
    id: "primeros-acordes-guitarra",
    area: "musica",
    titulo: "Primeros acordes en guitarra: Mi menor y La menor",
    fecha: "2026-10-10",
    resumen: "Dos acordes ideales para empezar, explicados para ubicarlos por el tacto.",
    etiquetas: ["guitarra", "acordes", "principiantes"],
    medios: [
      {
        tipo: "imagen",
        archivo: "medios/acorde-mi-menor.png",
        titulo: "Diagrama del acorde de Mi menor",
        descripcion: "Diagrama del mástil de la guitarra con seis cuerdas verticales y cuatro trastes. Hay dos círculos en el segundo traste: el dedo 2 en la quinta cuerda y el dedo 3 en la cuarta cuerda. Las cuerdas sexta, tercera, segunda y primera se tocan al aire."
      },
      {
        tipo: "audio",
        archivo: "medios/guitarra-mi-menor-la-menor.mp3",
        titulo: "Audio: Mi menor y La menor",
        descripcion: "Tres rasgueos de Mi menor, tres de La menor y un rasgueo final de Mi menor. Duración: 15 segundos."
      }
    ],
    contenido: `
      <p>Las cuerdas se cuentan de la más delgada (primera) a la más gruesa (sexta). Los trastes se cuentan desde la cabeza de la guitarra.</p>
      <h2>Mi menor</h2>
      <p>Coloca los dedos en el segundo traste de la quinta y la cuarta cuerda. Toca las seis cuerdas.</p>
      <h2>La menor</h2>
      <p>Coloca los dedos en el segundo traste de la cuarta y la tercera cuerda, y en el primer traste de la segunda cuerda. Toca desde la quinta cuerda, sin la sexta.</p>
      <h2>Práctica</h2>
      <p>Cambia de un acorde a otro despacio, contando cuatro tiempos en cada uno.</p>
    `
  },
  {
    id: "que-es-un-plugin-vst",
    area: "produccion-musical",
    titulo: "Qué es un plugin VST y cómo instalarlo",
    fecha: "2026-10-10",
    resumen: "Explicación sencilla de los plugins VST y los pasos básicos para usarlos en tu programa de producción.",
    etiquetas: ["VST", "plugins", "REAPER", "instalación"],
    contenido: `
      <p>Un plugin VST es un pequeño programa que se agrega a tu programa de producción musical para sumar instrumentos virtuales o efectos, como reverberación o compresión.</p>
      <h2>Pasos básicos en Windows</h2>
      <ul>
        <li>Descarga el plugin desde la página oficial de su creador.</li>
        <li>Instálalo o copia su archivo en la carpeta de plugins. Para VST3 suele ser C:\\Program Files\\Common Files\\VST3.</li>
        <li>Abre tu programa de producción y pide que vuelva a buscar plugins.</li>
      </ul>
      <h2>Accesibilidad</h2>
      <p>No todos los plugins se pueden manejar con lector de pantalla. En próximas publicaciones compartiré cuáles funcionan bien, por ejemplo con REAPER y la extensión OSARA.</p>
    `
  },
  {
    id: "atajos-basicos-nvda",
    area: "informatica-accesible",
    titulo: "Atajos básicos de NVDA para empezar",
    fecha: "2026-10-10",
    resumen: "Las combinaciones de teclas más útiles del lector de pantalla NVDA para el día a día.",
    etiquetas: ["NVDA", "lector de pantalla", "atajos", "Windows"],
    contenido: `
      <p>La tecla NVDA es, por defecto, la tecla Insert. También se puede configurar Bloq Mayús.</p>
      <h2>Atajos generales</h2>
      <ul>
        <li>Control: detiene la voz.</li>
        <li>NVDA más N: abre el menú de NVDA.</li>
        <li>NVDA más F7: abre la lista de elementos de una página web.</li>
      </ul>
      <h2>En páginas web</h2>
      <ul>
        <li>H: salta al siguiente encabezado.</li>
        <li>K: salta al siguiente enlace.</li>
        <li>F: salta al siguiente campo de formulario.</li>
      </ul>
    `
  },
  {
    id: "gestos-basicos-talkback",
    area: "dispositivos-moviles",
    titulo: "Gestos básicos de TalkBack en Android",
    fecha: "2026-10-10",
    resumen: "Los gestos esenciales para moverte por tu celular con el lector de pantalla TalkBack.",
    etiquetas: ["TalkBack", "Android", "celular", "gestos"],
    contenido: `
      <p>TalkBack es el lector de pantalla de Android. Con él, un toque lee y un doble toque activa.</p>
      <h2>Gestos esenciales</h2>
      <ul>
        <li>Deslizar un dedo a la derecha: siguiente elemento.</li>
        <li>Deslizar un dedo a la izquierda: elemento anterior.</li>
        <li>Doble toque: activa el elemento seleccionado.</li>
        <li>Deslizar dos dedos hacia arriba o abajo: desplaza la pantalla.</li>
      </ul>
    `
  },
  {
    id: "signo-generador-braille",
    area: "braille",
    titulo: "El signo generador del sistema Braille",
    fecha: "2026-10-10",
    resumen: "La base de todo el sistema Braille: seis puntos y cómo se numeran.",
    etiquetas: ["Braille", "signo generador", "lectoescritura"],
    medios: [
      {
        tipo: "video",
        archivo: "medios/signo-generador-braille.mp4",
        subtitulos: "medios/signo-generador-braille.vtt",
        titulo: "Video: los seis puntos del signo generador",
        descripcion: "Animación de una celda Braille. Los puntos se iluminan uno por uno, del 1 al 6, con un sonido en cada uno. Al final se muestran las letras a, b y c. Tiene subtítulos en español. Duración: 15 segundos."
      }
    ],
    contenido: `
      <p>Cada signo Braille se forma en una celda de seis puntos, organizados en dos columnas de tres.</p>
      <h2>Numeración de los puntos</h2>
      <ul>
        <li>Columna izquierda, de arriba hacia abajo: puntos 1, 2 y 3.</li>
        <li>Columna derecha, de arriba hacia abajo: puntos 4, 5 y 6.</li>
      </ul>
      <p>Combinando estos puntos se obtienen 63 signos distintos, además del espacio en blanco.</p>
    `
  },
  {
    id: "primer-programa-python",
    area: "programacion",
    titulo: "Mi primer programa en Python",
    fecha: "2026-10-10",
    resumen: "Escribe y ejecuta tu primer programa usando un editor accesible.",
    etiquetas: ["Python", "programación", "principiantes"],
    contenido: `
      <p>Python es un lenguaje fácil de leer, ideal para empezar a programar con lector de pantalla.</p>
      <h2>El programa</h2>
      <p>Crea un archivo llamado hola.py y escribe esta línea:</p>
      <pre><code>print("Hola, mundo")</code></pre>
      <p>Al ejecutarlo, el programa mostrará el texto Hola, mundo.</p>
    `
  }
];
