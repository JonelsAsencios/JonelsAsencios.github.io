// Sitio de Jonels Asencios: cabecera, buscador, áreas, publicaciones,
// lectura en voz alta, reproductor multimedia, opiniones, comentarios y vistas.
(function () {
  "use strict";

  var NOMBRE = "Jonels Asencios";
  var CORREO = "contacto@jonelsasencios.com";
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var pagina = document.body.getAttribute("data-pagina") || "";
  var cfg = window.CONFIG || {};

  // Íconos de cada área (decorativos)
  var ICONOS = {
    "educacion": '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>',
    "musica": '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    "produccion-musical": '<path d="M5 4v16M12 4v16M19 4v16"/><rect x="3" y="13" width="4" height="3" rx="1"/><rect x="10" y="7" width="4" height="3" rx="1"/><rect x="17" y="15" width="4" height="3" rx="1"/>',
    "informatica-accesible": '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    "dispositivos-moviles": '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    "braille": '<circle cx="8" cy="5" r="2"/><circle cx="16" cy="5" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="19" r="2"/><circle cx="16" cy="19" r="2"/>',
    "programacion": '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    "herramientas": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>'
  };
  function icono(id) {
    return '<span class="icono icono-' + id + '" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">' +
      (ICONOS[id] || '<circle cx="12" cy="12" r="8"/>') + "</svg></span>";
  }

  // ---------- Utilidades ----------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function escapar(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function normalizar(t) { return String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function parametro(n) { return new URLSearchParams(location.search).get(n) || ""; }
  function fecha(iso) {
    var p = String(iso).split("-");
    return p.length === 3 ? parseInt(p[2], 10) + " de " + MESES[parseInt(p[1], 10) - 1] + " de " + p[0] : iso;
  }
  function buscarArea(id) { return AREAS.filter(function (a) { return a.id === id; })[0] || null; }
  function ordenar(l) { return l.slice().sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; }); }
  function publicacionesDe(id) { return ordenar(PUBLICACIONES.filter(function (p) { return p.area === id; })); }
  function textoPlano(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent || ""; }
  function poner(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function leer(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function plural(n, uno, varios) { return n + " " + (n === 1 ? uno : varios); }
  function tiempo(s) {
    s = Math.max(0, Math.floor(s || 0));
    return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
  }
  function tiempoHablado(s) {
    s = Math.max(0, Math.floor(s || 0));
    var m = Math.floor(s / 60), r = s % 60;
    return (m ? plural(m, "minuto", "minutos") + " " : "") + plural(r, "segundo", "segundos");
  }

  // ---------- Cabecera y pie ----------
  var menuEnlaces = [
    ["index.html", "Inicio", "inicio"],
    ["index.html#areas", "Áreas", "area"],
    ["herramientas.html", "Herramientas", "herramientas"],
    ["novedades.html", "Novedades", "novedades"],
    ["index.html#sobre-mi", "Sobre mí", ""],
    ["index.html#contacto", "Contacto", ""]
  ];
  var cab = document.getElementById("cabecera");
  if (cab) cab.outerHTML =
    '<a class="saltar" href="#contenido">Saltar al contenido principal</a>' +
    '<header class="cabecera"><div class="contenedor cabecera-fila">' +
      '<p class="logo"><a href="index.html">' + NOMBRE + "</a></p>" +
      '<button class="boton-menu" type="button" aria-expanded="false" aria-controls="menu-principal">Menú</button>' +
      '<nav aria-label="Menú principal"><ul id="menu-principal" class="menu">' +
        menuEnlaces.map(function (e) {
          return '<li><a href="' + e[0] + '"' + (e[2] && e[2] === pagina ? ' aria-current="page"' : "") + ">" + e[1] + "</a></li>";
        }).join("") +
      "</ul></nav></div>" +
      '<div class="barra"><div class="contenedor barra-fila">' +
        '<form class="buscador" role="search" action="buscar.html" method="get">' +
          '<label for="campo-busqueda" class="solo-lector">Buscar en el sitio</label>' +
          '<input id="campo-busqueda" name="q" type="search" placeholder="Buscar en el sitio" autocomplete="off">' +
          '<button type="submit">Buscar</button>' +
        "</form>" +
        '<button type="button" class="boton-opciones" aria-expanded="false" aria-controls="panel-opciones">Ajustar letra y colores</button>' +
      "</div>" +
      '<div id="panel-opciones" class="contenedor panel-opciones" hidden>' +
        '<p class="ayuda-opciones">Acomoda la página para verla mejor. Tus cambios se guardan para la próxima visita.</p>' +
        '<div role="group" aria-label="Tamaño de la letra" class="grupo-opciones">' +
          '<button type="button" id="texto-mas">Letra más grande</button>' +
          '<button type="button" id="texto-menos">Letra más pequeña</button>' +
          '<button type="button" id="texto-normal">Letra normal</button>' +
        "</div>" +
        '<button type="button" id="contraste" aria-pressed="false">Alto contraste (fondo negro, letras amarillas)</button>' +
      "</div></div></header>" +
    '<div id="aviso" class="solo-lector" aria-live="polite"></div>';

  var pie = document.getElementById("pie");
  if (pie) pie.outerHTML = '<footer class="pie"><div class="contenedor pie-fila">' +
    "<p>© " + new Date().getFullYear() + " " + NOMBRE + "</p>" +
    '<p><a href="mailto:' + CORREO + '">' + CORREO + '</a> · <a href="https://github.com/JonelsAsencios">GitHub</a>' + (pagina === "inicio" ? ' · <a href="estadisticas.html" rel="nofollow">Mis estadísticas</a>' : "") + "</p>" +
    "</div></footer>";

  var aviso = document.getElementById("aviso");
  function anunciar(t) { aviso.textContent = ""; setTimeout(function () { aviso.textContent = t; }, 60); }

  // ---------- Opciones de lectura ----------
  var raiz = document.documentElement, tamanos = [100, 112, 125, 140, 160], indice = 0;
  function aplicarTamano(decir) {
    raiz.style.setProperty("--tamano-base", tamanos[indice] + "%");
    guardar("tamano", String(indice));
    if (decir) anunciar("Tamaño de la letra: " + tamanos[indice] + " por ciento");
  }
  var g = parseInt(leer("tamano"), 10);
  if (g >= 0 && g < tamanos.length) indice = g;
  aplicarTamano(false);
  $("#texto-mas").onclick = function () { if (indice < tamanos.length - 1) indice++; aplicarTamano(true); };
  $("#texto-menos").onclick = function () { if (indice > 0) indice--; aplicarTamano(true); };
  $("#texto-normal").onclick = function () { indice = 0; aplicarTamano(true); };

  var bContraste = $("#contraste");
  function contraste(on, decir) {
    raiz.classList.toggle("alto-contraste", on);
    bContraste.setAttribute("aria-pressed", String(on));
    guardar("contraste", on ? "1" : "0");
    if (decir) anunciar(on ? "Alto contraste activado" : "Alto contraste desactivado");
  }
  contraste(leer("contraste") === "1", false);
  bContraste.onclick = function () { contraste(!raiz.classList.contains("alto-contraste"), true); };

  function desplegable(boton, panel, mostrarClase) {
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      if (mostrarClase) panel.classList.toggle(mostrarClase, !abierto); else panel.hidden = abierto;
    });
  }
  desplegable($(".boton-opciones"), $("#panel-opciones"));
  var bMenu = $(".boton-menu"), menu = $("#menu-principal");
  desplegable(bMenu, menu, "abierto");
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { bMenu.setAttribute("aria-expanded", "false"); menu.classList.remove("abierto"); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("abierto")) {
      bMenu.setAttribute("aria-expanded", "false"); menu.classList.remove("abierto"); bMenu.focus();
    }
  });

  // ---------- Vistas y votos (GoatCounter) ----------
  var gc = cfg.goatcounter;
  function contar(path, evento) {
    if (!gc) return;
    var intento = setInterval(function () {
      if (!window.goatcounter || !window.goatcounter.count) return;
      clearInterval(intento);
      window.goatcounter.count({ path: path, title: path, event: !!evento });
    }, 150);
    setTimeout(function () { clearInterval(intento); }, 10000);
  }
  function obtenerConteo(path, cb) {
    if (!gc || !window.fetch) return;
    fetch("https://" + gc + ".goatcounter.com/counter/" + encodeURIComponent(path) + ".json")
      .then(function (r) { return r.ok ? r.json() : { count: "0" }; })
      .then(function (d) { cb(parseInt(String(d.count).replace(/\D/g, ""), 10) || 0); })
      .catch(function () {});
  }
  if (gc) {
    var sc = document.createElement("script");
    sc.async = true; sc.src = "https://gc.zgo.at/count.js";
    sc.setAttribute("data-goatcounter", "https://" + gc + ".goatcounter.com/count");
    sc.setAttribute("data-goatcounter-settings", '{"no_onload": true}');
    document.head.appendChild(sc);
  }
  function rutaPub(id) { return "/publicacion/" + id; }
  function rellenarVistas(ctx) {
    if (!gc) return;
    Array.prototype.forEach.call((ctx || document).querySelectorAll("[data-vistas]"), function (el) {
      obtenerConteo(rutaPub(el.getAttribute("data-vistas")), function (n) {
        el.textContent = plural(n, "vista", "vistas"); el.hidden = false;
      });
    });
  }

  // ---------- Compartir (ventana de diálogo aparte) ----------
  function compartirHTML(etiqueta) {
    return '<div class="compartir"><button type="button" class="boton boton-secundario b-compartir" aria-haspopup="dialog">' + etiqueta + "</button></div>";
  }
  function prepararCompartir() {
    var botones = document.querySelectorAll(".b-compartir");
    if (!botones.length) return;
    var dlg = document.createElement("dialog");
    dlg.className = "dialogo-compartir";
    dlg.setAttribute("aria-labelledby", "titulo-compartir");
    document.body.appendChild(dlg);
    var origen = null;

    function abrir(boton) {
      origen = boton;
      var url = location.href.split("#")[0];
      var titulo = document.title, u = encodeURIComponent(url), t = encodeURIComponent(titulo);
      var redes = [
        ["WhatsApp", "https://wa.me/?text=" + t + "%20" + u],
        ["Facebook", "https://www.facebook.com/sharer/sharer.php?u=" + u],
        ["X (Twitter)", "https://twitter.com/intent/tweet?text=" + t + "&url=" + u],
        ["Telegram", "https://t.me/share/url?url=" + u + "&text=" + t],
        ["LinkedIn", "https://www.linkedin.com/sharing/share-offsite/?url=" + u],
        ["Correo electrónico", "mailto:?subject=" + t + "&body=" + t + "%0A" + u]
      ];
      dlg.innerHTML =
        '<h2 id="titulo-compartir">Compartir</h2>' +
        '<p class="que-compartes">' + escapar(titulo.replace(" | " + NOMBRE, "")) + "</p>" +
        '<div class="opciones-compartir">' +
          '<button type="button" class="b-copiar">Copiar enlace</button>' +
          redes.map(function (r) {
            var correo = r[1].indexOf("mailto:") === 0;
            return '<a class="red" href="' + r[1] + '"' + (correo ? "" : ' target="_blank" rel="noopener"') + ">" + r[0] +
              (correo ? "" : '<span class="solo-lector"> (se abre en otra pestaña)</span>') + "</a>";
          }).join("") +
          (navigator.share ? '<button type="button" class="b-mas">Más aplicaciones</button>' : "") +
        "</div>" +
        '<p class="estado-copia" role="status"></p>' +
        '<button type="button" class="b-cerrar boton">Cerrar</button>';

      var bc = dlg.querySelector(".b-copiar"), estado = dlg.querySelector(".estado-copia");
      bc.onclick = function () {
        function listo() { estado.textContent = "Enlace copiado. Ya puedes pegarlo donde quieras."; }
        function viejo() {
          var ta = document.createElement("textarea"); ta.value = url; ta.setAttribute("readonly", "");
          ta.style.position = "fixed"; ta.style.opacity = "0"; dlg.appendChild(ta); ta.select();
          try { document.execCommand("copy"); listo(); } catch (e) { estado.textContent = "No se pudo copiar. El enlace es: " + url; }
          dlg.removeChild(ta); bc.focus();
        }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(listo, viejo);
        else viejo();
      };
      var bm = dlg.querySelector(".b-mas");
      if (bm) bm.onclick = function () { navigator.share({ title: titulo, url: url }).catch(function () {}); };
      dlg.querySelector(".b-cerrar").onclick = function () { if (dlg.close) dlg.close(); else { dlg.removeAttribute("open"); dlg.dispatchEvent(new Event("close")); } };

      // Ocultar por completo el resto de la página (para todos los lectores de pantalla)
      scrollPrevio = window.scrollY;
      ocultos = Array.prototype.filter.call(document.body.children, function (el) {
        return el !== dlg && el.tagName !== "SCRIPT" && !el.hidden;
      });
      ocultos.forEach(function (el) { el.hidden = true; el.setAttribute("inert", ""); el.setAttribute("aria-hidden", "true"); });
      document.body.classList.add("compartiendo");
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
      window.scrollTo(0, 0);
      bc.focus();
    }
    var ocultos = [], scrollPrevio = 0;
    dlg.addEventListener("close", function () {
      ocultos.forEach(function (el) { el.hidden = false; el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); });
      ocultos = [];
      document.body.classList.remove("compartiendo");
      window.scrollTo(0, scrollPrevio);
      if (origen) origen.focus();
    });
    // Clic fuera del cuadro lo cierra
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    Array.prototype.forEach.call(botones, function (b) { b.addEventListener("click", function () { abrir(b); }); });
  }

  // ---------- Piezas comunes ----------
  function migas(items) {
    return '<nav class="migas" aria-label="Ruta de navegación"><ol>' + items.map(function (it, i) {
      return i === items.length - 1 ? '<li><span aria-current="page">' + escapar(it[0]) + "</span></li>"
        : '<li><a href="' + it[1] + '">' + escapar(it[0]) + "</a></li>";
    }).join("") + "</ol></nav>";
  }
  function vistasHTML(id) { return gc ? ' <span class="vistas" data-vistas="' + escapar(id) + '" hidden></span>' : ""; }
  function listaPublicaciones(lista, mostrarArea) {
    if (!lista.length) return "";
    return '<ul class="lista-publicaciones">' + lista.map(function (p) {
      var a = buscarArea(p.area) || { id: "", nombre: "" };
      return '<li class="item-publicacion area-' + a.id + '">' +
        (mostrarArea ? '<p class="chip">' + icono(a.id) + escapar(a.nombre) + "</p>" : "") +
        '<h3><a href="publicacion.html?id=' + encodeURIComponent(p.id) + '">' + escapar(p.titulo) + "</a></h3>" +
        '<p class="descripcion"><strong>Descripción:</strong> ' + escapar(p.resumen) + "</p>" +
        '<p class="meta"><time datetime="' + escapar(p.fecha) + '">' + fecha(p.fecha) + "</time>" +
        (p.medios && p.medios.length ? " · Con multimedia" : "") +
        vistasHTML(p.id) + "</p></li>";
    }).join("") + "</ul>";
  }

  // ---------- Reproductor multimedia accesible ----------
  var reproductores = [];
  function medioHTML(m, n) {
    var desc = '<p class="desc-medio"><strong>Descripción:</strong> ' + escapar(m.descripcion || "") + "</p>";
    if (m.tipo === "imagen") {
      return '<figure class="medio">' +
        '<img src="' + escapar(m.archivo) + '" alt="' + escapar(m.descripcion || m.titulo || "") + '" loading="lazy">' +
        "<figcaption><strong>" + escapar(m.titulo || "Imagen") + "</strong></figcaption></figure>";
    }
    var esVideo = m.tipo === "video", id = "rep-" + n;
    return '<figure class="medio medio-' + m.tipo + '" aria-labelledby="' + id + '-titulo">' +
      '<p class="titulo-medio" id="' + id + '-titulo"><strong>' + escapar(m.titulo || (esVideo ? "Video" : "Audio")) + "</strong></p>" +
      desc +
      (esVideo
        ? '<video id="' + id + '" preload="metadata" playsinline src="' + escapar(m.archivo) + '">' +
            (m.subtitulos ? '<track kind="captions" srclang="es" label="Español" src="' + escapar(m.subtitulos) + '" default>' : "") +
          "</video>"
        : '<audio id="' + id + '" preload="metadata" src="' + escapar(m.archivo) + '"></audio>') +
      '<div class="reproductor" role="group" aria-label="Reproductor de ' + escapar(m.titulo || m.tipo) + '" aria-describedby="' + id + '-atajos" data-medio="' + id + '">' +
        '<div class="fila-controles">' +
          '<button type="button" data-accion="reproducir" class="b-principal">Reproducir</button>' +
          '<button type="button" data-accion="atras">Retroceder 10 s</button>' +
          '<button type="button" data-accion="adelante">Avanzar 10 s</button>' +
          '<span class="tiempo" aria-hidden="true">0:00 / 0:00</span>' +
        "</div>" +
        '<label class="control-rango">Posición <input type="range" data-accion="posicion" min="0" max="0" step="1" value="0"></label>' +
        '<div class="fila-controles">' +
          '<button type="button" data-accion="silenciar" aria-pressed="false">Silenciar</button>' +
          '<label class="control-rango">Volumen <input type="range" data-accion="volumen" min="0" max="100" step="5" value="100"></label>' +
          '<label>Velocidad <select data-accion="velocidad">' +
            [0.5, 0.75, 1, 1.25, 1.5, 2].map(function (v) {
              return '<option value="' + v + '"' + (v === 1 ? " selected" : "") + ">" + String(v).replace(".", ",") + "x</option>";
            }).join("") + "</select></label>" +
          (esVideo ? (m.subtitulos ? '<button type="button" data-accion="subtitulos" aria-pressed="true">Subtítulos</button>' : "") +
            '<button type="button" data-accion="pantalla">Pantalla completa</button>' : "") +
        "</div>" +
        '<p class="error-medio" hidden>Tu navegador no pudo reproducir este archivo. <a href="' + escapar(m.archivo) + '" target="_blank" rel="noopener">Abrir el ' + (esVideo ? "video" : "audio") + ' en otra pestaña</a>.</p>' +
        '<details class="atajos"><summary>Atajos de teclado</summary><p id="' + id + '-atajos">' +
          "Con el foco en el reproductor: Espacio o K, reproducir o pausar. J y L, retroceder o avanzar 10 segundos. " +
          "Flechas izquierda y derecha, 5 segundos. Flechas arriba y abajo, volumen. M, silenciar. " +
          "Inicio y Fin, ir al principio o al final. Números del 0 al 9, saltar del 0 al 90 por ciento. " +
          "Menor que y mayor que, cambiar la velocidad. T, decir el tiempo." +
          (esVideo ? " F, pantalla completa. C, subtítulos." : "") +
          " Con NVDA o JAWS, activa el modo foco (NVDA más Espacio) para usar estos atajos." +
        "</p></details>" +
      "</div></figure>";
  }

  function activarReproductor(caja) {
    var media = document.getElementById(caja.getAttribute("data-medio"));
    var b = function (a) { return caja.querySelector('[data-accion="' + a + '"]'); };
    var bPlay = b("reproducir"), pos = b("posicion"), vol = b("volumen"), vel = b("velocidad"),
      bMute = b("silenciar"), bSub = b("subtitulos"), bPant = b("pantalla"), tx = caja.querySelector(".tiempo");
    reproductores.push(media);

    function actualizar() {
      var d = isFinite(media.duration) ? media.duration : 0;
      pos.max = Math.floor(d); pos.value = Math.floor(media.currentTime);
      pos.setAttribute("aria-valuetext", tiempoHablado(media.currentTime) + " de " + tiempoHablado(d));
      tx.textContent = tiempo(media.currentTime) + " / " + tiempo(d);
    }
    function fallo() {
      var aviso2 = caja.querySelector(".error-medio");
      aviso2.hidden = false;
      anunciar("No se pudo reproducir. Usa el enlace para abrir el archivo.");
    }
    function alternar() {
      if (media.paused) {
        if (media.readyState === 0) media.load();
        var pr = media.play();
        if (pr && pr.catch) pr.catch(function (err) { if (err && err.name !== "AbortError") fallo(); });
      } else media.pause();
    }
    media.addEventListener("error", fallo);
    function mover(s) {
      media.currentTime = Math.min(Math.max(0, media.currentTime + s), media.duration || 0);
      anunciar(tiempoHablado(media.currentTime));
    }
    function volumen(v) {
      media.volume = Math.min(1, Math.max(0, v)); media.muted = false;
      vol.value = Math.round(media.volume * 100); anunciar("Volumen " + vol.value + " por ciento");
    }
    function velocidad(paso) {
      var ops = Array.prototype.map.call(vel.options, function (o) { return parseFloat(o.value); });
      var i = Math.min(ops.length - 1, Math.max(0, ops.indexOf(media.playbackRate) + paso));
      media.playbackRate = ops[i]; vel.value = String(ops[i]);
      anunciar("Velocidad " + String(ops[i]).replace(".", ","));
    }
    function silenciar() { media.muted = !media.muted; }
    function subtitulos() {
      var t = media.textTracks && media.textTracks[0]; if (!t) return;
      var on = t.mode !== "showing"; t.mode = on ? "showing" : "hidden";
      bSub.setAttribute("aria-pressed", String(on)); anunciar(on ? "Subtítulos activados" : "Subtítulos desactivados");
    }
    function pantalla() {
      var fig = caja.closest("figure");
      if (document.fullscreenElement) document.exitFullscreen();
      else if (fig.requestFullscreen) fig.requestFullscreen();
      else if (media.webkitEnterFullscreen) media.webkitEnterFullscreen();
    }

    media.addEventListener("loadedmetadata", actualizar);
    media.addEventListener("timeupdate", actualizar);
    media.addEventListener("play", function () {
      reproductores.forEach(function (o) { if (o !== media) o.pause(); });
      detenerLectura();
      bPlay.textContent = "Pausar"; anunciar("Reproduciendo");
    });
    media.addEventListener("pause", function () { bPlay.textContent = "Reproducir"; if (!media.ended) anunciar("En pausa"); });
    media.addEventListener("ended", function () { bPlay.textContent = "Reproducir"; anunciar("Reproducción terminada"); });
    media.addEventListener("volumechange", function () {
      bMute.setAttribute("aria-pressed", String(media.muted));
      bMute.textContent = media.muted ? "Activar sonido" : "Silenciar";
    });
    if (media.tagName === "VIDEO") media.addEventListener("click", alternar);

    bPlay.onclick = alternar;
    b("atras").onclick = function () { mover(-10); };
    b("adelante").onclick = function () { mover(10); };
    bMute.onclick = function () { silenciar(); anunciar(media.muted ? "Silenciado" : "Sonido activado"); };
    pos.addEventListener("input", function () { media.currentTime = parseFloat(pos.value); });
    vol.addEventListener("input", function () { media.volume = vol.value / 100; media.muted = false; });
    vel.addEventListener("change", function () { media.playbackRate = parseFloat(vel.value); });
    if (bSub) bSub.onclick = subtitulos;
    if (bPant) bPant.onclick = pantalla;

    caja.closest("figure").addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      var t = e.target, k = e.key, enBoton = t.tagName === "BUTTON" || t.tagName === "SUMMARY",
        enSelect = t.tagName === "SELECT", enVol = t === vol;
      var hecho = true;
      if ((k === " " || k === "Enter") && (enBoton || enSelect)) return; // el control hace su propia acción
      if (k === " " || k === "k" || k === "K") alternar();
      else if (k === "j" || k === "J") mover(-10);
      else if (k === "l" || k === "L") mover(10);
      else if (k === "ArrowLeft" && !enVol && !enSelect) mover(-5);
      else if (k === "ArrowRight" && !enVol && !enSelect) mover(5);
      else if (k === "ArrowUp" && !enVol && !enSelect) volumen(media.volume + 0.1);
      else if (k === "ArrowDown" && !enVol && !enSelect) volumen(media.volume - 0.1);
      else if (k === "m" || k === "M") { silenciar(); anunciar(media.muted ? "Silenciado" : "Sonido activado"); }
      else if (k === "Home" && !enSelect) { media.currentTime = 0; anunciar("Inicio"); }
      else if (k === "End" && !enSelect) { media.currentTime = media.duration || 0; anunciar("Final"); }
      else if (/^[0-9]$/.test(k)) { media.currentTime = (media.duration || 0) * parseInt(k, 10) / 10; anunciar(tiempoHablado(media.currentTime)); }
      else if (k === "<" || k === ",") velocidad(-1);
      else if (k === ">" || k === ".") velocidad(1);
      else if (k === "t" || k === "T") anunciar(tiempoHablado(media.currentTime) + " de " + tiempoHablado(media.duration));
      else if ((k === "f" || k === "F") && bPant) pantalla();
      else if ((k === "c" || k === "C") && bSub) subtitulos();
      else hecho = false;
      if (hecho) e.preventDefault();
    });
  }

  // ---------- Lectura en voz alta ----------
  var lectura = { estado: "detenida", partes: [], i: 0, turno: 0 };
  function vozEspanol() {
    var vs = window.speechSynthesis.getVoices();
    return vs.filter(function (v) { return /^es[-_](PE|419|MX|US|AR|CO|CL)/i.test(v.lang); })[0] ||
      vs.filter(function (v) { return /^es/i.test(v.lang); })[0] || null;
  }
  function pintarLectura() {
    var bot = $("#b-escuchar"); if (!bot) return;
    var activa = lectura.estado !== "detenida";
    bot.textContent = lectura.estado === "leyendo" ? "Pausar lectura" : lectura.estado === "pausada" ? "Continuar lectura" : "Escuchar publicación";
    bot.setAttribute("aria-pressed", String(lectura.estado === "leyendo"));
    ["#b-leer-atras", "#b-leer-adelante", "#b-detener", ".velocidad-lectura"].forEach(function (id) { $(id).hidden = !activa; });
    var pos = $("#posicion-lectura");
    pos.textContent = activa ? "Párrafo " + (lectura.i + 1) + " de " + lectura.partes.length : "";
  }
  function leerDesde(i) {
    var s = window.speechSynthesis;
    lectura.turno++; var miTurno = lectura.turno;
    s.cancel();
    if (i < 0) i = 0;
    if (i >= lectura.partes.length) { detenerLectura(); return; }
    lectura.i = i; lectura.estado = "leyendo"; pintarLectura();
    var u = new SpeechSynthesisUtterance(lectura.partes[i]);
    u.lang = "es-PE"; var v = vozEspanol(); if (v) u.voice = v;
    u.rate = parseFloat(($("#vel-lectura") || {}).value) || 1;
    u.onend = function () { if (miTurno === lectura.turno && lectura.estado === "leyendo") leerDesde(lectura.i + 1); };
    // Algunos navegadores necesitan una pequeña pausa después de cancel()
    setTimeout(function () { if (miTurno === lectura.turno) s.speak(u); }, 60);
  }
  function detenerLectura() {
    if (!$("#b-escuchar")) return;
    lectura.turno++; lectura.estado = "detenida";
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    pintarLectura();
  }
  function prepararLectura(contenedor) {
    var bot = $("#b-escuchar");
    if (!bot) return;
    if (!("speechSynthesis" in window)) { $(".lectura").hidden = true; return; }
    function partes() {
      return Array.prototype.map.call(contenedor.querySelectorAll("h1, h2, h3, p, li, figcaption"),
        function (n) { return n.closest(".reproductor, .lectura, .chip") ? "" : n.textContent.trim(); }).filter(Boolean);
    }
    bot.onclick = function () {
      var s = window.speechSynthesis;
      if (lectura.estado === "detenida") {
        lectura.partes = partes();
        reproductores.forEach(function (m) { m.pause(); });
        leerDesde(0);
      } else if (lectura.estado === "leyendo") {
        s.pause(); lectura.estado = "pausada"; pintarLectura();
      } else {
        s.resume(); lectura.estado = "leyendo"; pintarLectura();
        // Si el navegador no reanuda, vuelve a leer el párrafo actual
        setTimeout(function () { if (lectura.estado === "leyendo" && !s.speaking) leerDesde(lectura.i); }, 300);
      }
    };
    $("#b-leer-atras").onclick = function () { leerDesde(lectura.i - 1); };
    $("#b-leer-adelante").onclick = function () { leerDesde(lectura.i + 1); };
    $("#b-detener").onclick = function () { detenerLectura(); bot.focus(); anunciar("Lectura detenida"); };
    var sel = $("#vel-lectura"), guardada = leer("vel-lectura");
    if (guardada && sel.querySelector('option[value="' + guardada + '"]')) sel.value = guardada;
    sel.addEventListener("change", function () {
      guardar("vel-lectura", sel.value);
      if (lectura.estado === "leyendo") leerDesde(lectura.i);   // aplica la nueva velocidad desde el párrafo actual
    });
    pintarLectura();
  }

  // ---------- Opiniones: los "Me gusta" son públicos; los "No me gusta" solo los ve el autor ----------
  function prepararVotos(id) {
    var bSi = $("#b-megusta"), bNo = $("#b-nomegusta"), estado = $("#estado-voto");
    var clave = "voto-" + id;
    function pintar() {
      var v = leer(clave);
      bSi.setAttribute("aria-pressed", String(v === "si"));
      bNo.setAttribute("aria-pressed", String(v === "no"));
    }
    function conteo() {
      obtenerConteo("megusta-" + id, function (n) { $("#n-megusta").textContent = plural(n, "persona", "personas") + " marcaron Me gusta"; });
    }
    function votar(v) {
      if (leer(clave) === v) { guardar(clave, ""); pintar(); estado.textContent = "Quitaste tu opinión."; return; }
      guardar(clave, v); pintar();
      if (!leer(clave + "-enviado-" + v)) {
        contar(v === "si" ? "megusta-" + id : "nomegusta-" + id, true);
        guardar(clave + "-enviado-" + v, "1");
      }
      estado.textContent = v === "si" ? "Gracias, marcaste que te gusta esta publicación." : "Gracias por tu opinión, nos ayuda a mejorar.";
      if (v === "si") setTimeout(conteo, 4000);
    }
    bSi.onclick = function () { votar("si"); };
    bNo.onclick = function () { votar("no"); };
    pintar(); conteo();
  }

  // ---------- Formularios (FormSubmit: los mensajes llegan al correo) ----------
  var GROSERIAS = ["idiota", "imbecil", "estupido", "estupida", "tarado", "tarada", "mierda", "carajo", "cojudo", "cojuda",
    "huevon", "huevona", "cabron", "cabrona", "puta", "puto", "putas", "pendejo", "pendeja", "maricon", "conchatumare",
    "conchasumare", "ctm", "csm", "malparido", "malparida", "gonorrea", "mongolico", "mongolica", "subnormal", "pinga",
    "verga", "culero", "zorra", "perra", "imbeciles", "idiotas", "estupidos", "basura", "asco", "lacra", "porqueria"];
  function esOfensivo(texto) {
    var palabras = normalizar(texto).replace(/[^a-zñ0-9\s]/g, " ").split(/\s+/);
    return palabras.some(function (w) { return GROSERIAS.indexOf(w) !== -1; }) ||
      /hijo\s*de\s*(su\s*)?puta|concha\s*(de\s*)?tu\s*madre/.test(normalizar(texto));
  }
  function prepararFormulario(form, opciones) {
    if (!form) return;
    var estado = form.querySelector(".estado-form"), boton = form.querySelector('[type="submit"]');
    function error(campo, texto) {
      var msg = document.getElementById(campo.id + "-error");
      msg.textContent = texto; msg.hidden = !texto;
      campo.setAttribute("aria-invalid", texto ? "true" : "false");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var primero = null;
      Array.prototype.forEach.call(form.querySelectorAll('[required], input[type="email"]'), function (c) {
        var t = "";
        if (!c.value.trim()) { if (c.required) t = "Este campo es obligatorio."; }
        else if (c.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value.trim())) t = "Escribe un correo válido, por ejemplo nombre@gmail.com.";
        error(c, t); if (t && !primero) primero = c;
      });
      if (primero) { primero.focus(); estado.textContent = "Revisa los campos marcados."; return; }
      var textoTotal = Array.prototype.map.call(form.querySelectorAll("input:not([type=hidden]), textarea"), function (c) { return c.value; }).join(" ");
      if (opciones.filtrar && esOfensivo(textoTotal)) {
        estado.textContent = "Tu mensaje contiene palabras ofensivas y no se puede enviar. Por favor, escríbelo de forma respetuosa.";
        return;
      }
      if (form.querySelector('[name="_honey"]').value) return; // trampa para robots
      var datos = {};
      Array.prototype.forEach.call(form.elements, function (c) { if (c.name && c.name !== "_honey") datos[c.name] = c.value; });
      if (opciones.extra) Object.keys(opciones.extra).forEach(function (k) { datos[k] = opciones.extra[k]; });
      try {
        datos["Fecha y hora (Lima)"] = new Date().toLocaleString("es-PE", {
          timeZone: "America/Lima", weekday: "long", day: "numeric", month: "long", year: "numeric",
          hour: "numeric", minute: "2-digit", hour12: true
        });
      } catch (e) {}
      boton.disabled = true; estado.textContent = "Enviando…";
      fetch("https://formsubmit.co/ajax/" + (cfg.correoFormularios || CORREO), {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(datos)
      }).then(function (r) { return r.json(); }).then(function (r) {
        if (String(r.success) === "true") {
          var conCorreo = !!datos.email;
          form.reset();
          estado.textContent = typeof opciones.exito === "function" ? opciones.exito(conCorreo) : opciones.exito;
        }
        else estado.textContent = "No se pudo enviar el mensaje. Inténtalo más tarde o escribe a " + CORREO + ".";
      }).catch(function () {
        estado.textContent = "No se pudo enviar el mensaje. Revisa tu conexión o escribe a " + CORREO + ".";
      }).then(function () { boton.disabled = false; });
    });
  }
  function campo(id, etiqueta, tipo, extra) {
    var control = tipo === "textarea"
      ? '<textarea id="' + id + '" name="' + extra.name + '" rows="5" required aria-describedby="' + id + '-error"></textarea>'
      : '<input id="' + id + '" name="' + extra.name + '" type="' + tipo + '"' + (extra.auto ? ' autocomplete="' + extra.auto + '"' : "") +
        (extra.opcional ? "" : " required") + ' aria-describedby="' + (extra.ayuda ? id + "-ayuda " : "") + id + '-error">';
    return '<div class="campo"><label for="' + id + '">' + etiqueta + (extra.opcional ? " (opcional)" : "") + "</label>" +
      (extra.ayuda ? '<p class="ayuda-campo" id="' + id + '-ayuda">' + extra.ayuda + "</p>" : "") + control +
      '<p class="error-campo" id="' + id + '-error" hidden></p></div>';
  }
  var TRAMPA = '<div class="solo-lector" aria-hidden="true"><label>No llenar <input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>';

  // ---------- Comentarios: se revisan antes de publicarse ----------
  function prepararComentarios(pub) {
    var lista = (window.COMENTARIOS || []).filter(function (c) { return c.publicacion === pub.id; });
    $("#comentarios").innerHTML =
      (lista.length
        ? '<ul class="lista-comentarios">' + lista.map(function (c) {
            return '<li class="comentario"><p class="autor"><strong>' + escapar(c.nombre) + '</strong> · <time datetime="' + escapar(c.fecha) + '">' + fecha(c.fecha) + "</time></p><p>" + escapar(c.texto) + "</p></li>";
          }).join("") + "</ul>"
        : '<p class="nota">Todavía no hay comentarios. ¡Sé la primera persona en comentar!</p>') +
      '<form id="form-comentario" class="formulario" novalidate>' +
        "<h3>Escribe un comentario</h3>" +
        '<p class="nota">Los comentarios se revisan antes de publicarse. No se publican comentarios ofensivos.</p>' +
        campo("com-nombre", "Tu nombre", "text", { name: "nombre", auto: "name" }) +
        campo("com-texto", "Tu comentario", "textarea", { name: "comentario" }) +
        TRAMPA +
        '<button type="submit" class="boton">Enviar comentario</button>' +
        '<p class="estado-form" role="status"></p>' +
      "</form>";
    $("#t-com").textContent = "Comentarios (" + lista.length + ")";
    prepararFormulario($("#form-comentario"), {
      filtrar: true,
      extra: { _subject: "Nuevo comentario en: " + pub.titulo, _template: "table", _captcha: "false", publicacion: pub.id, titulo: pub.titulo },
      exito: "Gracias. Tu comentario fue enviado y se publicará después de ser revisado."
    });
  }

  // ---------- Novedades ----------
  function listaNovedades() {
    return (window.NOVEDADES || []).slice().sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; });
  }
  function novedadHTML(n, nivel, completa) {
    var h = "h" + nivel;
    return '<li class="novedad" id="' + escapar(n.id) + '">' +
      "<" + h + ">" + (completa ? escapar(n.titulo)
        : '<a href="novedades.html#' + encodeURIComponent(n.id) + '">' + escapar(n.titulo) + "</a>") + "</" + h + ">" +
      '<p class="meta"><time datetime="' + escapar(n.fecha) + '">' + fecha(n.fecha) + "</time></p>" +
      (completa
        ? '<div class="texto-novedad">' + n.texto + "</div>" +
          (n.enlace && n.enlace.url ? '<p><a href="' + escapar(n.enlace.url) + '">' + escapar(n.enlace.texto || "Ver más") + "</a></p>" : "")
        : "<p>" + escapar(textoPlano(n.texto).trim().split(/\n\s*\n|\.\s/)[0].replace(/\.$/, "")) + ".</p>") +
      "</li>";
  }

  // ---------- Herramientas ----------
  function listaHerramientas() {
    return (window.HERRAMIENTAS || []).slice().sort(function (a, b) {
      if (a.propia !== b.propia) return a.propia ? -1 : 1;
      return a.fecha < b.fecha ? 1 : -1;
    });
  }
  function origenHerramienta(h) {
    return h.propia ? "Desarrollo propio" : "Recomendada" + (h.autor ? ", creada por " + h.autor : "");
  }
  function listaHerramientasHTML(lista, nivel) {
    var hn = "h" + (nivel || 3);
    return '<ul class="lista-publicaciones lista-herramientas">' + lista.map(function (h) {
      return '<li class="item-publicacion area-herramientas">' +
        "<" + hn + '><a href="herramienta.html?id=' + encodeURIComponent(h.id) + '">' + escapar(h.nombre) + "</a></" + hn + ">" +
        '<p class="descripcion"><strong>Descripción:</strong> ' + escapar(h.resumen) + "</p>" +
        '<p class="meta">' + escapar(h.tipo) + " · " + escapar(h.plataforma) + " · " + escapar(origenHerramienta(h)) +
        (h.estado ? ' · <span class="estado-herramienta">' + escapar(h.estado) + "</span>" : "") + "</p></li>";
    }).join("") + "</ul>";
  }

  // ================= PÁGINAS =================
  if (pagina === "inicio") {
    contar("/");
    poner("lista-areas", AREAS.map(function (a) {
      var n = publicacionesDe(a.id).length;
      return '<li class="tarjeta area-' + a.id + '">' + icono(a.id) +
        '<h3><a class="enlace-tarjeta" href="area.html?a=' + a.id + '">' + escapar(a.nombre) + "</a></h3>" +
        '<p class="descripcion"><strong>Descripción:</strong> ' + escapar(a.descripcion) + "</p>" +
        '<p class="meta">' + plural(n, "publicación", "publicaciones") + "</p></li>";
    }).join(""));
    poner("recientes", listaPublicaciones(ordenar(PUBLICACIONES).slice(0, 3), true));
    var herr = listaHerramientas();
    if (herr.length) {
      poner("ultimas-herramientas", listaHerramientasHTML(herr.slice(0, 2), 3) +
        '<p><a class="boton boton-secundario" href="herramientas.html">Ver todas las herramientas</a></p>');
    } else { var sh = $("#herramientas"); if (sh) sh.hidden = true; }
    var nov = listaNovedades();
    if (nov.length) {
      poner("ultimas-novedades", '<ul class="lista-novedades">' + nov.slice(0, 2).map(function (n) { return novedadHTML(n, 3, false); }).join("") + "</ul>" +
        '<p><a class="boton boton-secundario" href="novedades.html">Ver todas las novedades</a></p>');
    } else { var sn = $("#novedades"); if (sn) sn.hidden = true; }
    poner("compartir-inicio", compartirHTML("Compartir esta página"));
    poner("formulario-contacto",
      '<form id="form-contacto" class="formulario" novalidate>' +
        campo("con-nombre", "Nombre", "text", { name: "nombre", auto: "name" }) +
        campo("con-correo", "Correo electrónico", "email", { name: "email", auto: "email", opcional: true,
          ayuda: "Déjalo si quieres que te responda. Sin correo, recibiré tu mensaje, pero no podré contestarte." }) +
        campo("con-asunto", "Asunto", "text", { name: "asunto", opcional: true }) +
        campo("con-mensaje", "Mensaje", "textarea", { name: "mensaje" }) +
        TRAMPA +
        '<button type="submit" class="boton">Enviar mensaje</button>' +
        '<p class="estado-form" role="status"></p>' +
      "</form>");
    prepararFormulario($("#form-contacto"), {
      filtrar: false,
      extra: { _subject: "Mensaje desde tu página web", _template: "table", _captcha: "false" },
      exito: function (conCorreo) {
        return conCorreo ? "¡Gracias! Tu mensaje fue enviado. Te responderé pronto a tu correo."
          : "¡Gracias! Tu mensaje fue enviado. Como no dejaste correo, no podré responderte, pero lo leeré con atención.";
      }
    });
    rellenarVistas();
  }

  if (pagina === "area") {
    var area = buscarArea(parametro("a"));
    if (!area) {
      document.title = "Área no encontrada | " + NOMBRE;
      poner("principal", '<h1>Área no encontrada</h1><p><a href="index.html#areas">Ver todas las áreas</a></p>');
    } else {
      document.title = area.nombre + " | " + NOMBRE;
      contar("/area/" + area.id);
      var lista = publicacionesDe(area.id);
      $("#principal").classList.add("area-" + area.id);
      poner("principal",
        migas([["Inicio", "index.html"], ["Áreas", "index.html#areas"], [area.nombre]]) +
        '<div class="encabezado-area">' + icono(area.id) + "<h1>" + escapar(area.nombre) + "</h1></div>" +
        compartirHTML("Compartir esta área") +
        '<section aria-labelledby="t-pubs"><h2 id="t-pubs">Publicaciones (' + lista.length + ")</h2>" +
        (lista.length ? listaPublicaciones(lista, false) : "<p>Aún no hay publicaciones en esta área.</p>") + "</section>");
      rellenarVistas();
    }
  }

  if (pagina === "publicacion") {
    var pub = PUBLICACIONES.filter(function (p) { return p.id === parametro("id"); })[0];
    if (!pub) {
      document.title = "Publicación no encontrada | " + NOMBRE;
      poner("principal", '<h1>Publicación no encontrada</h1><p><a href="index.html">Volver al inicio</a></p>');
    } else {
      var ap = buscarArea(pub.area) || { id: "", nombre: "Área" };
      document.title = pub.titulo + " | " + NOMBRE;
      contar(rutaPub(pub.id));
      $("#principal").classList.add("area-" + ap.id);
      var medios = (pub.medios || []).map(medioHTML).join("");
      poner("principal",
        migas([["Inicio", "index.html"], [ap.nombre, "area.html?a=" + ap.id], [pub.titulo]]) +
        '<article class="articulo" id="articulo">' +
          '<p class="chip">' + icono(ap.id) + escapar(ap.nombre) + "</p>" +
          "<h1>" + escapar(pub.titulo) + "</h1>" +
          '<p class="meta"><time datetime="' + escapar(pub.fecha) + '">' + fecha(pub.fecha) + "</time>" + vistasHTML(pub.id) + "</p>" +
          '<div class="lectura" role="group" aria-label="Lectura en voz alta">' +
            '<button type="button" id="b-escuchar" class="boton" aria-pressed="false">Escuchar publicación</button>' +
            '<button type="button" id="b-leer-atras" class="boton boton-secundario" hidden>Retroceder párrafo</button>' +
            '<button type="button" id="b-leer-adelante" class="boton boton-secundario" hidden>Avanzar párrafo</button>' +
            '<button type="button" id="b-detener" class="boton boton-secundario" hidden>Detener</button>' +
            '<label class="velocidad-lectura" hidden>Velocidad de lectura <select id="vel-lectura">' +
              [0.75, 1, 1.25, 1.5, 1.75, 2].map(function (v) {
                return '<option value="' + v + '"' + (v === 1 ? " selected" : "") + ">" + String(v).replace(".", ",") + "x</option>";
              }).join("") + "</select></label>" +
            '<span id="posicion-lectura" class="posicion-lectura"></span></div>' +
          compartirHTML("Compartir publicación") +
          '<div class="cuerpo">' + pub.contenido + "</div>" +
          (medios ? '<section aria-labelledby="t-multi"><h2 id="t-multi">Multimedia</h2>' + medios + "</section>" : "") +
        "</article>" +
        '<section class="opinion" aria-labelledby="t-op"><h2 id="t-op">¿Te gustó esta publicación?</h2>' +
          '<div class="botones-voto">' +
            '<button type="button" id="b-megusta" aria-pressed="false">Me gusta</button>' +
            '<button type="button" id="b-nomegusta" aria-pressed="false">No me gusta</button>' +
          "</div>" + '<p id="n-megusta" class="nota"></p>' +
          '<p id="estado-voto" role="status" class="nota"></p></section>' +
        '<section aria-labelledby="t-com"><h2 id="t-com">Comentarios</h2><div id="comentarios"></div></section>' +
        (pub.etiquetas && pub.etiquetas.length ? '<p class="etiquetas">Temas relacionados: ' + pub.etiquetas.map(function (t) {
          return '<a href="buscar.html?q=' + encodeURIComponent(t) + '">' + escapar(t) + "</a>";
        }).join(", ") + "</p>" : "") +
        '<p><a href="area.html?a=' + ap.id + '">Ver más publicaciones de ' + escapar(ap.nombre) + "</a></p>");
      Array.prototype.forEach.call(document.querySelectorAll(".reproductor"), activarReproductor);
      prepararLectura($("#articulo"));
      prepararVotos(pub.id);
      prepararComentarios(pub);
      rellenarVistas();
    }
  }

  // ---------- Mis estadísticas (página privada) ----------
  if (pagina === "estadisticas") {
    document.title = "Mis estadísticas | " + NOMBRE;
    var CLAVE_API = "gc-clave-api";
    var INICIO_SITIO = "2026-10-01";

    function vistaClave(msg) {
      poner("principal",
        "<h1>Mis estadísticas</h1>" +
        '<p class="lema">Página privada para ver las vistas, los "Me gusta", los "No me gusta" y las descargas de tu sitio.</p>' +
        (msg ? '<p class="aviso-error" role="alert">' + escapar(msg) + "</p>" : "") +
        '<form id="form-clave" class="formulario" novalidate>' +
          '<div class="campo"><label for="clave-api">Clave de acceso de GoatCounter (API key)</label>' +
          '<p class="ayuda-campo" id="clave-ayuda">Se guarda solo en este navegador. Nadie más puede verla.</p>' +
          '<input id="clave-api" type="password" autocomplete="off" aria-describedby="clave-ayuda" required></div>' +
          '<button type="submit" class="boton">Ver mis estadísticas</button>' +
        "</form>");
      $("#form-clave").addEventListener("submit", function (e) {
        e.preventDefault();
        var v = $("#clave-api").value.trim();
        if (!v) { $("#clave-api").focus(); return; }
        guardar(CLAVE_API, v);
        cargar("todo");
      });
      $("#clave-api").focus();
    }

    function desde(periodo) {
      var d = new Date();
      if (periodo === "7") d.setDate(d.getDate() - 7);
      else if (periodo === "30") d.setDate(d.getDate() - 30);
      else return INICIO_SITIO + "T00:00:00Z";
      return d.toISOString().slice(0, 10) + "T00:00:00Z";
    }

    function pedirTodo(clave, periodo) {
      var todos = [], excluir = [];
      function pagina1() {
        var url = "https://" + gc + ".goatcounter.com/api/v0/stats/hits?limit=100&start=" + encodeURIComponent(desde(periodo)) +
          excluir.map(function (id) { return "&exclude_paths=" + id; }).join("");
        return fetch(url, { headers: { "Authorization": "Bearer " + clave } }).then(function (r) {
          if (r.status === 401 || r.status === 403) throw new Error("clave");
          if (!r.ok) throw new Error("red");
          return r.json();
        }).then(function (d) {
          (d.hits || []).forEach(function (h) { todos.push(h); excluir.push(h.path_id); });
          return d.more && excluir.length < 1000 ? pagina1() : todos;
        });
      }
      return pagina1();
    }

    function cargar(periodo) {
      var clave = leer(CLAVE_API);
      if (!clave) { vistaClave(); return; }
      if (!gc) { poner("principal", "<h1>Mis estadísticas</h1><p>Falta configurar GoatCounter en configuracion.js.</p>"); return; }
      poner("principal", '<h1>Mis estadísticas</h1><p role="status">Cargando estadísticas…</p>');
      pedirTodo(clave, periodo).then(function (hits) { mostrar(hits, periodo); }).catch(function (err) {
        if (err.message === "clave") { guardar(CLAVE_API, ""); vistaClave("La clave no es válida o no tiene permiso para leer estadísticas. Revisa que al crearla marcaste \"Read statistics\"."); }
        else poner("principal", '<h1>Mis estadísticas</h1><p role="alert">No se pudieron cargar las estadísticas. Revisa tu conexión y vuelve a intentarlo.</p><p><button type="button" class="boton" id="b-reintentar">Reintentar</button></p>'), $("#b-reintentar").onclick = function () { cargar(periodo); };
      });
    }

    function mostrar(hits, periodo) {
      var n = {};
      hits.forEach(function (h) { n[h.path] = (n[h.path] || 0) + (h.count || 0); });
      function c(p) { return n[p] || 0; }
      function linea(partes) { return partes.join(", ") + "."; }

      var pubs = ordenar(PUBLICACIONES).map(function (p) {
        return { titulo: p.titulo, url: "publicacion.html?id=" + encodeURIComponent(p.id),
          vistas: c("/publicacion/" + p.id), si: c("megusta-" + p.id), no: c("nomegusta-" + p.id) };
      });
      var hers = listaHerramientas().map(function (h) {
        return { titulo: h.nombre, url: "herramienta.html?id=" + encodeURIComponent(h.id),
          vistas: c("/herramienta/" + h.id), si: c("megusta-herramienta-" + h.id), no: c("nomegusta-herramienta-" + h.id),
          descargas: c("descarga-" + h.id) };
      });
      var otras = [["Inicio", c("/")], ["Novedades", c("/novedades")], ["Herramientas (lista)", c("/herramientas")]]
        .concat(AREAS.map(function (a) { return ["Área: " + a.nombre, c("/area/" + a.id)]; }));

      var totVistas = hits.filter(function (h) { return !h.event; }).reduce(function (s, h) { return s + (h.count || 0); }, 0);
      var totSi = pubs.concat(hers).reduce(function (s, x) { return s + x.si; }, 0);
      var totNo = pubs.concat(hers).reduce(function (s, x) { return s + x.no; }, 0);
      var totDesc = hers.reduce(function (s, x) { return s + x.descargas; }, 0);

      function item(x, conDesc) {
        return '<li class="fila-estadistica"><a href="' + x.url + '">' + escapar(x.titulo) + "</a>: " +
          linea([plural(x.vistas, "vista", "vistas"), x.si + " Me gusta", x.no + " No me gusta"]
            .concat(conDesc ? [plural(x.descargas, "descarga", "descargas")] : [])) + "</li>";
      }
      var porVistas = function (a, b) { return b.vistas - a.vistas; };
      var nombrePeriodo = periodo === "7" ? "los últimos 7 días" : periodo === "30" ? "los últimos 30 días" : "el inicio del sitio";

      poner("principal",
        "<h1>Mis estadísticas</h1>" +
        '<div class="controles-estadisticas">' +
          '<label for="periodo">Periodo <select id="periodo">' +
            '<option value="todo"' + (periodo === "todo" ? " selected" : "") + ">Desde el inicio</option>" +
            '<option value="30"' + (periodo === "30" ? " selected" : "") + ">Últimos 30 días</option>" +
            '<option value="7"' + (periodo === "7" ? " selected" : "") + ">Últimos 7 días</option>" +
          "</select></label>" +
          '<button type="button" id="b-actualizar">Actualizar</button>' +
          '<button type="button" id="b-olvidar">Olvidar clave en este dispositivo</button>' +
        "</div>" +
        '<p role="status" class="nota">Datos desde ' + nombrePeriodo + ".</p>" +
        '<section aria-labelledby="t-resumen"><h2 id="t-resumen">Resumen</h2><ul>' +
          "<li>" + plural(totVistas, "vista", "vistas") + " en total.</li>" +
          "<li>" + totSi + " Me gusta.</li>" +
          "<li>" + totNo + " No me gusta.</li>" +
          "<li>" + plural(totDesc, "descarga", "descargas") + ".</li>" +
        "</ul></section>" +
        '<section aria-labelledby="t-epub"><h2 id="t-epub">Publicaciones</h2><ul class="lista-estadisticas">' +
          pubs.sort(porVistas).map(function (x) { return item(x, false); }).join("") + "</ul></section>" +
        '<section aria-labelledby="t-eher"><h2 id="t-eher">Herramientas</h2><ul class="lista-estadisticas">' +
          hers.sort(porVistas).map(function (x) { return item(x, true); }).join("") + "</ul></section>" +
        '<section aria-labelledby="t-eotras"><h2 id="t-eotras">Otras páginas</h2><ul class="lista-estadisticas">' +
          otras.sort(function (a, b) { return b[1] - a[1]; }).map(function (o) {
            return '<li class="fila-estadistica">' + escapar(o[0]) + ": " + plural(o[1], "vista", "vistas") + ".</li>";
          }).join("") + "</ul></section>" +
        '<p class="nota">Los comentarios y los mensajes de contacto no aparecen aquí: llegan a tu correo.</p>');
      $("#periodo").addEventListener("change", function () { cargar(this.value); });
      $("#b-actualizar").onclick = function () { cargar($("#periodo").value); };
      $("#b-olvidar").onclick = function () { guardar(CLAVE_API, ""); vistaClave(); anunciar("Clave olvidada en este dispositivo"); };
      $("#principal h1").setAttribute("tabindex", "-1"); 
    }

    cargar("todo");
  }

  if (pagina === "herramientas") {
    contar("/herramientas");
    document.title = "Herramientas | " + NOMBRE;
    var th = listaHerramientas();
    poner("principal",
      migas([["Inicio", "index.html"], ["Herramientas"]]) +
      '<div class="encabezado-area area-herramientas">' + icono("herramientas") + "<h1>Herramientas</h1></div>" +
      compartirHTML("Compartir herramientas") +
      '<p class="lema">Programas, aplicaciones y complementos accesibles que desarrollo o recomiendo, con instrucciones para instalarlos y usarlos.</p>' +
      (th.length ? listaHerramientasHTML(th, 2) : "<p>Pronto compartiré aquí mis herramientas.</p>"));
  }

  if (pagina === "herramienta") {
    var hx = (window.HERRAMIENTAS || []).filter(function (h) { return h.id === parametro("id"); })[0];
    if (!hx) {
      document.title = "Herramienta no encontrada | " + NOMBRE;
      poner("principal", '<h1>Herramienta no encontrada</h1><p><a href="herramientas.html">Ver todas las herramientas</a></p>');
    } else {
      document.title = hx.nombre + " | " + NOMBRE;
      contar("/herramienta/" + hx.id);
      $("#principal").classList.add("area-herramientas");
      var obtener;
      if (hx.descarga && hx.descarga.archivo) {
        obtener = '<p><a class="boton boton-descarga" id="b-descargar" href="' + escapar(hx.descarga.archivo) + '" download>Descargar ' + escapar(hx.nombre) +
          (hx.version ? ", versión " + escapar(hx.version) : "") + "</a></p>" +
          (hx.descarga.tamano ? '<p class="nota">Tamaño del archivo: ' + escapar(hx.descarga.tamano) + "</p>" : "");
      } else if (hx.sitioOficial && hx.sitioOficial.url) {
        obtener = '<p><a class="boton boton-descarga" id="b-descargar" href="' + escapar(hx.sitioOficial.url) + '" target="_blank" rel="noopener">' +
          escapar(hx.sitioOficial.texto || "Ir al sitio oficial") + '<span class="solo-lector"> (se abre en otra pestaña)</span></a></p>' +
          '<p class="nota">Te llevo a su sitio oficial para que descargues siempre la versión más reciente y segura.</p>';
      } else {
        obtener = "<p>Todavía no está disponible para descargar. Lo anunciaré en <a href=\"novedades.html\">Novedades</a> cuando esté listo.</p>";
      }
      poner("principal",
        migas([["Inicio", "index.html"], ["Herramientas", "herramientas.html"], [hx.nombre]]) +
        '<article class="articulo" id="articulo">' +
          '<p class="chip">' + icono("herramientas") + escapar(hx.tipo) + "</p>" +
          "<h1>" + escapar(hx.nombre) + "</h1>" +
          '<p class="meta">' + escapar(hx.plataforma) + (hx.version ? " · Versión " + escapar(hx.version) : "") +
            ' · Actualizado el <time datetime="' + escapar(hx.fecha) + '">' + fecha(hx.fecha) + "</time></p>" +
          '<p class="origen">' + escapar(origenHerramienta(hx)) +
            (hx.estado ? ' · <span class="estado-herramienta">' + escapar(hx.estado) + "</span>" : "") + "</p>" +
          compartirHTML("Compartir herramienta") +
          '<div class="cuerpo">' + hx.contenido + "</div>" +
          (hx.requisitos && hx.requisitos.length ? '<section aria-labelledby="t-req"><h2 id="t-req">Requisitos</h2><ul>' +
            hx.requisitos.map(function (q) { return "<li>" + escapar(q) + "</li>"; }).join("") + "</ul></section>" : "") +
          '<section aria-labelledby="t-desc" class="bloque-descarga"><h2 id="t-desc">' + (hx.propia ? "Descarga" : "Dónde conseguirla") + "</h2>" + obtener + "</section>" +
        "</article>" +
        '<section class="opinion" aria-labelledby="t-op"><h2 id="t-op">¿Te resultó útil?</h2>' +
          '<div class="botones-voto">' +
            '<button type="button" id="b-megusta" aria-pressed="false">Me gusta</button>' +
            '<button type="button" id="b-nomegusta" aria-pressed="false">No me gusta</button>' +
          "</div>" + '<p id="n-megusta" class="nota"></p>' +
          '<p id="estado-voto" role="status" class="nota"></p></section>' +
        '<section aria-labelledby="t-com"><h2 id="t-com">Comentarios</h2><div id="comentarios"></div></section>' +
        '<p><a href="herramientas.html">Ver todas las herramientas</a></p>');
      var bd = $("#b-descargar");
      if (bd) bd.addEventListener("click", function () { contar("descarga-" + hx.id, true); });
      prepararVotos("herramienta-" + hx.id);
      prepararComentarios({ id: "herramienta-" + hx.id, titulo: hx.nombre });
    }
  }

  if (pagina === "novedades") {
    contar("/novedades");
    document.title = "Novedades | " + NOMBRE;
    var todas = listaNovedades();
    poner("principal",
      migas([["Inicio", "index.html"], ["Novedades"]]) +
      "<h1>Novedades</h1>" +
      compartirHTML("Compartir novedades") +
      '<p class="lema">Anuncios de talleres, clases, eventos y materiales nuevos.</p>' +
      (todas.length ? '<ul class="lista-novedades completa">' + todas.map(function (n) { return novedadHTML(n, 2, true); }).join("") + "</ul>"
        : "<p>Por ahora no hay novedades.</p>"));
    if (location.hash) {
      var destino = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (destino) { destino.setAttribute("tabindex", "-1"); destino.scrollIntoView(); destino.focus(); }
    }
  }

  if (pagina === "buscar") {
    var q = parametro("q").trim();
    $("#campo-busqueda").value = q;
    var html = migas([["Inicio", "index.html"], ["Búsqueda"]]) + "<h1>Resultados de búsqueda</h1>";
    if (!q) {
      document.title = "Buscar | " + NOMBRE;
      html += "<p>Escribe una palabra en el buscador, por ejemplo: guitarra, Braille o NVDA.</p>";
    } else {
      var palabras = normalizar(q).split(/\s+/).filter(Boolean);
      var res = ordenar(PUBLICACIONES.filter(function (p) {
        var a = buscarArea(p.area);
        var t = normalizar([p.titulo, p.resumen, (p.etiquetas || []).join(" "), a ? a.nombre : "",
          textoPlano(p.contenido), (p.medios || []).map(function (m) { return m.titulo + " " + m.descripcion; }).join(" ")].join(" "));
        return palabras.every(function (w) { return t.indexOf(w) !== -1; });
      }));
      var resNov = listaNovedades().filter(function (n) {
        var t = normalizar(n.titulo + " " + textoPlano(n.texto));
        return palabras.every(function (w) { return t.indexOf(w) !== -1; });
      });
      document.title = "Buscar: " + q + " | " + NOMBRE;
      var resHer = listaHerramientas().filter(function (h) {
        var t = normalizar([h.nombre, h.tipo, h.plataforma, h.resumen, (h.etiquetas || []).join(" "), textoPlano(h.contenido)].join(" "));
        return palabras.every(function (w) { return t.indexOf(w) !== -1; });
      });
      var total = res.length + resNov.length + resHer.length;
      var secciones = (res.length ? 1 : 0) + (resNov.length ? 1 : 0) + (resHer.length ? 1 : 0);
      html += '<p role="status">' + (total ? (total === 1 ? "Se encontró 1 resultado" : "Se encontraron " + total + " resultados")
        : "No se encontraron resultados") + " para «" + escapar(q) + "».</p>" +
        (res.length ? (secciones > 1 ? "<h2>Publicaciones</h2>" : "") + listaPublicaciones(res, true) : "") +
        (resHer.length ? (secciones > 1 ? "<h2>Herramientas</h2>" : "") + listaHerramientasHTML(resHer, 3) : "") +
        (resNov.length ? (secciones > 1 ? "<h2>Novedades</h2>" : "") + '<ul class="lista-novedades">' + resNov.map(function (n) { return novedadHTML(n, 3, false); }).join("") + "</ul>" : "") +
        (total ? "" : '<p>Prueba con otra palabra o <a href="index.html#areas">revisa las áreas</a>.</p>');
    }
    poner("principal", html);
    rellenarVistas();
  }
  prepararCompartir();
})();
