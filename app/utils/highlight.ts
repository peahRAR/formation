/**
 * Coloration syntaxique légère pour HTML, CSS, JavaScript, JSON et Vue.
 *
 * Pas de dépendance : les exemples du cours sont courts et simples, un petit
 * tokenizer suffit. Le résultat est découpé ligne par ligne afin de pouvoir
 * numéroter et mettre en évidence des lignes précises.
 */
import type { CodeLang } from '~/types/course'

export type TokenType =
  | 'plain'
  | 'comment'
  | 'keyword'
  | 'string'
  | 'number'
  | 'function'
  | 'property'
  | 'punctuation'
  | 'tag'
  | 'attr'
  | 'selector'
  | 'value'
  | 'atrule'
  | 'boolean'

interface Token {
  type: TokenType
  text: string
}

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'async', 'await',
  'try', 'catch', 'finally', 'throw', 'new', 'import', 'from', 'export', 'default', 'class',
  'this', 'typeof', 'of', 'in', 'switch', 'case', 'break', 'continue',
])
const JS_LITERALS = new Set(['true', 'false', 'null', 'undefined'])

function pushToken(tokens: Token[], type: TokenType, text: string) {
  if (!text) return
  const last = tokens[tokens.length - 1]
  if (last && last.type === type) last.text += text
  else tokens.push({ type, text })
}

/* ---------------------------------------------------------- JavaScript */

function tokenizeJs(code: string, tokens: Token[] = []): Token[] {
  const re =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(@?[A-Za-z_$][\w$]*)|(\s+)|([^\s\w$])/gy
  let m: RegExpExecArray | null
  let prevSignificant = ''
  while ((m = re.exec(code))) {
    const [text, comment, str, num, ident, ws] = m
    if (comment) pushToken(tokens, 'comment', text)
    else if (str) pushToken(tokens, 'string', text)
    else if (num) pushToken(tokens, 'number', text)
    else if (ident) {
      const rest = code.slice(re.lastIndex)
      if (ident.startsWith('@')) pushToken(tokens, 'function', ident)
      else if (JS_KEYWORDS.has(ident)) pushToken(tokens, 'keyword', ident)
      else if (JS_LITERALS.has(ident)) pushToken(tokens, 'boolean', ident)
      else if (/^\s*\(/.test(rest)) pushToken(tokens, 'function', ident)
      else if (prevSignificant === '.') pushToken(tokens, 'property', ident)
      else pushToken(tokens, 'plain', ident)
    } else if (ws) pushToken(tokens, 'plain', ws)
    else pushToken(tokens, 'punctuation', text)
    if (!ws) prevSignificant = text
  }
  return tokens
}

/* ----------------------------------------------------------------- CSS */

function tokenizeCss(code: string, tokens: Token[] = []): Token[] {
  let i = 0
  let depth = 0
  let inValue = false
  while (i < code.length) {
    const rest = code.slice(i)
    let m: RegExpMatchArray | null
    if ((m = rest.match(/^\/\*[\s\S]*?\*\//))) {
      pushToken(tokens, 'comment', m[0])
    } else if ((m = rest.match(/^\s+/))) {
      pushToken(tokens, 'plain', m[0])
    } else if ((m = rest.match(/^@[\w-]+/))) {
      pushToken(tokens, 'atrule', m[0])
    } else if (rest[0] === '{') {
      depth++
      inValue = false
      pushToken(tokens, 'punctuation', '{')
      m = ['{']
    } else if (rest[0] === '}') {
      depth = Math.max(0, depth - 1)
      inValue = false
      pushToken(tokens, 'punctuation', '}')
      m = ['}']
    } else if (rest[0] === ';') {
      inValue = false
      pushToken(tokens, 'punctuation', ';')
      m = [';']
    } else if (inValue) {
      m = rest.match(/^('[^']*'|"[^"]*"|#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:px|rem|em|%|vh|vw|fr|s|ms|deg)?|[^\s;{}]+)/)!
      const v = m[0]
      pushToken(tokens, /^['"]/.test(v) ? 'string' : /^[-#\d.]/.test(v) ? 'number' : 'value', v)
    } else if (depth > 0 && (m = rest.match(/^([\w-]+)(\s*)(:)/)) && !looksLikeSelector(rest)) {
      pushToken(tokens, 'property', m[1]!)
      pushToken(tokens, 'plain', m[2]!)
      pushToken(tokens, 'punctuation', ':')
      inValue = true
    } else if ((m = rest.match(/^[^{};\s]+/))) {
      // Sélecteur, ou paramètres d'une règle @media.
      const isParen = /^[():]/.test(m[0]) || /^[\w-]+:/.test(m[0])
      pushToken(tokens, isParen ? 'value' : 'selector', m[0])
    } else {
      m = [rest[0]!]
      pushToken(tokens, 'plain', rest[0]!)
    }
    i += m[0].length
  }
  return tokens
}

/** Distingue « .fiche > * { » (sélecteur imbriqué) de « color: red; ». */
function looksLikeSelector(rest: string): boolean {
  const line = rest.split('\n')[0]!
  const brace = line.indexOf('{')
  const semi = line.indexOf(';')
  return brace !== -1 && (semi === -1 || brace < semi)
}

/* ---------------------------------------------------------------- HTML */

function tokenizeHtml(code: string, tokens: Token[] = []): Token[] {
  let i = 0
  while (i < code.length) {
    const rest = code.slice(i)
    let m: RegExpMatchArray | null
    if ((m = rest.match(/^<!--[\s\S]*?-->/))) {
      pushToken(tokens, 'comment', m[0])
      i += m[0].length
    } else if ((m = rest.match(/^(<\/?)([A-Za-z][\w-]*)/))) {
      const tagName = m[2]!.toLowerCase()
      pushToken(tokens, 'punctuation', m[1]!)
      pushToken(tokens, 'tag', m[2]!)
      i += m[0].length
      // Attributs jusqu'au « > ».
      while (i < code.length) {
        const r = code.slice(i)
        let a: RegExpMatchArray | null
        if ((a = r.match(/^\s+/))) pushToken(tokens, 'plain', a[0])
        else if ((a = r.match(/^\/?>/))) {
          pushToken(tokens, 'punctuation', a[0])
          i += a[0].length
          break
        } else if ((a = r.match(/^([^\s=>/]+)(=)("[^"]*"|'[^']*'|[^\s>]+)/))) {
          pushToken(tokens, 'attr', a[1]!)
          pushToken(tokens, 'punctuation', '=')
          pushToken(tokens, 'string', a[3]!)
        } else if ((a = r.match(/^[^\s=>/]+/))) pushToken(tokens, 'attr', a[0])
        else a = [r[0]!]
        i += a[0].length
      }
      // Contenu des balises <script> et <style>.
      if (m[1] === '<' && (tagName === 'script' || tagName === 'style')) {
        const close = code.toLowerCase().indexOf(`</${tagName}`, i)
        const inner = code.slice(i, close === -1 ? undefined : close)
        if (tagName === 'script') tokenizeJs(inner, tokens)
        else tokenizeCss(inner, tokens)
        i += inner.length
      }
    } else if ((m = rest.match(/^\{\{[\s\S]*?\}\}/))) {
      // Interpolation Vue / Angular.
      pushToken(tokens, 'punctuation', '{{')
      tokenizeJs(m[0].slice(2, -2), tokens)
      pushToken(tokens, 'punctuation', '}}')
      i += m[0].length
    } else if ((m = rest.match(/^[^<{]+|^[<{]/))) {
      pushToken(tokens, 'plain', m[0])
      i += m[0].length
    }
  }
  return tokens
}

/* ---------------------------------------------------------------- JSON */

function tokenizeJson(code: string): Token[] {
  const tokens: Token[] = []
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?)|(true|false|null)|(\s+)|(.)/gy
  let m: RegExpExecArray | null
  while ((m = re.exec(code))) {
    const [text, str, colon, num, lit, ws] = m
    if (str) {
      pushToken(tokens, colon ? 'property' : 'string', str)
      if (colon) pushToken(tokens, 'punctuation', colon)
    } else if (num) pushToken(tokens, 'number', text)
    else if (lit) pushToken(tokens, 'boolean', text)
    else if (ws) pushToken(tokens, 'plain', text)
    else pushToken(tokens, 'punctuation', text)
  }
  return tokens
}

/* -------------------------------------------------------------- Rendu */

export function tokenize(code: string, lang: CodeLang): Token[] {
  switch (lang) {
    case 'js':
      return tokenizeJs(code)
    case 'css':
      return tokenizeCss(code)
    case 'html':
    case 'vue':
      return tokenizeHtml(code)
    case 'json':
      return tokenizeJson(code)
    default:
      return [{ type: 'plain', text: code }]
  }
}

export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Renvoie une chaîne HTML par ligne de code, prête pour v-html. */
export function highlightLines(code: string, lang: CodeLang): string[] {
  const lines: string[] = ['']
  for (const token of tokenize(code, lang)) {
    const parts = token.text.split('\n')
    parts.forEach((part, idx) => {
      if (idx > 0) lines.push('')
      if (!part) return
      const html = escapeHtml(part)
      lines[lines.length - 1] += token.type === 'plain' ? html : `<span class="tok-${token.type}">${html}</span>`
    })
  }
  return lines
}

/** Version en un seul bloc (pour l'éditeur superposé). */
export function highlight(code: string, lang: CodeLang): string {
  return highlightLines(code, lang).join('\n')
}
