/**
 * Construit le document HTML complet affiché dans une iframe isolée.
 *
 * L'iframe est créée avec sandbox="allow-scripts" SANS allow-same-origin :
 * le code de l'apprenant s'exécute dans une origine opaque, sans accès à la
 * page principale, à ses cookies ni à son stockage local.
 */

export interface PreviewSource {
  html: string
  css?: string
  js?: string
  /** Balises supplémentaires dans <head> (feuille de style d'un framework…). */
  head?: string
  /** URL de base pour résoudre les chemins relatifs (images locales). */
  baseUrl?: string
  /**
   * Active le pont d'inspection : survoler un élément le signale à la page
   * parente, qui peut en retour demander d'en surligner un (par index dans
   * l'ordre du document).
   */
  inspect?: boolean
  /** Couleur du surlignage d'inspection. */
  inspectColor?: string
}

/** Message envoyé par l'iframe à la page principale. */
export interface PreviewMessage {
  source: 'fw-preview'
  type: 'error' | 'log' | 'hover'
  message?: string
  index?: number | null
}

function inspectBridge(color: string): string {
  return `<style>.fw-hl{outline:3px solid ${color}!important;outline-offset:3px;border-radius:4px;transition:outline-color .2s}</style>
<script>
(function () {
  function all() { return Array.prototype.slice.call(document.body.querySelectorAll('*')); }
  var current = null;
  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.source !== 'fw-parent' || d.type !== 'highlight') return;
    if (current) current.classList.remove('fw-hl');
    current = d.index == null ? null : all()[d.index] || null;
    if (current) current.classList.add('fw-hl');
  });
  document.addEventListener('mouseover', function (e) {
    var i = all().indexOf(e.target);
    parent.postMessage({ source: 'fw-preview', type: 'hover', index: i < 0 ? null : i }, '*');
  });
  document.addEventListener('mouseleave', function () {
    parent.postMessage({ source: 'fw-preview', type: 'hover', index: null }, '*');
  });
})();
<\/script>`
}

// Petit script injecté avant le code de l'apprenant : il remonte les erreurs
// et les console.log à la page parente pour les afficher sous l'aperçu.
const BRIDGE = `<script>
(function () {
  function send(type, message) {
    try { parent.postMessage({ source: 'fw-preview', type: type, message: String(message) }, '*'); } catch (e) {}
  }
  window.addEventListener('error', function (e) { send('error', e.message); });
  window.addEventListener('unhandledrejection', function (e) { send('error', e.reason && e.reason.message || e.reason); });
  var log = console.log;
  console.log = function () {
    send('log', Array.prototype.map.call(arguments, function (a) {
      try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch (e) { return String(a); }
    }).join(' '));
    log.apply(console, arguments);
  };
})();
<\/script>`

export function buildPreviewDocument(src: PreviewSource): string {
  const base = src.baseUrl ? `<base href="${src.baseUrl}">` : ''
  // On empêche la balise </script> écrite par l'apprenant de casser le document.
  const js = (src.js ?? '').replace(/<\/script/gi, '<\\/script')
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${base}
${BRIDGE}
${src.head ?? ''}
${src.inspect ? inspectBridge(src.inspectColor ?? '#6366f1') : ''}
<style>${src.css ?? ''}</style>
</head>
<body>
${src.html}
${js ? `<script>\n${js}\n<\/script>` : ''}
</body>
</html>`
}

const VOID_TAGS = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'area', 'base', 'col', 'embed', 'track', 'wbr'])

export interface ElementInfo {
  tag: string
  /** Ligne de la balise ouvrante (à partir de 1). */
  start: number
  /** Ligne de la balise fermante. */
  end: number
  /** Profondeur dans l'arbre (0 = premier niveau du body). */
  depth: number
  /** Texte direct de l'élément, s'il tient sur la ligne. */
  text?: string
  /** Attributs principaux (class, src, alt…). */
  attrs: Record<string, string>
}

/**
 * Liste les éléments d'un fragment HTML simple, dans l'ordre du document
 * (le même que document.body.querySelectorAll('*') dans l'aperçu).
 * Suffisant pour les exemples du cours ; ce n'est pas un parseur complet.
 */
export function parseElements(html: string): ElementInfo[] {
  const out: ElementInfo[] = []
  const stack: ElementInfo[] = []
  const tagRe = /<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g
  html.split('\n').forEach((line, i) => {
    let m: RegExpExecArray | null
    tagRe.lastIndex = 0
    while ((m = tagRe.exec(line))) {
      const [, closing, rawTag, rawAttrs] = m
      const tag = rawTag!.toLowerCase()
      if (closing) {
        const el = stack.pop()
        if (el) el.end = i + 1
        continue
      }
      const attrs: Record<string, string> = {}
      for (const a of rawAttrs!.matchAll(/([\w:@-]+)="([^"]*)"/g)) attrs[a[1]!] = a[2]!
      const after = line.slice(tagRe.lastIndex)
      const text = after.match(/^([^<]+)<\//)?.[1]?.trim()
      const el: ElementInfo = { tag, start: i + 1, end: i + 1, depth: stack.length, text, attrs }
      out.push(el)
      if (!VOID_TAGS.has(tag) && !rawAttrs!.endsWith('/')) stack.push(el)
    }
  })
  return out
}

/** Lignes à surligner pour un élément : ouverture et fermeture. */
export function elementLines(el: ElementInfo | undefined): number[] {
  if (!el) return []
  return el.start === el.end ? [el.start] : [el.start, el.end]
}

/** Index de l'élément qui s'ouvre (ou se ferme) sur une ligne donnée. */
export function elementAtLine(elements: ElementInfo[], line: number): number | null {
  const i = elements.findIndex((e) => e.start === line)
  if (i !== -1) return i
  const j = elements.findIndex((e) => e.end === line)
  return j === -1 ? null : j
}
