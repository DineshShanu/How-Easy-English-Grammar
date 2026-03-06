const https = require('node:https')
const zlib = require('node:zlib')

const queries = {
  alphabet: 'English alphabet pronunciation A to Z',
  'parts-of-speech': 'parts of speech English grammar',
  noun: 'noun in English grammar',
  pronoun: 'pronoun in English grammar',
  verb: 'verb in English grammar',
  adjective: 'adjective in English grammar',
  adverb: 'adverb in English grammar',
  preposition: 'prepositions in English grammar',
  conjunction: 'conjunction in English grammar',
  interjection: 'interjection in English grammar',
  sentences: 'types of sentences English grammar',
  'sentence-types': 'types of sentences English grammar',
  articles: 'articles a an the English grammar',
  plural: 'singular and plural nouns English grammar',
  gender: 'gender in English grammar nouns',
  'tense-intro': 'tenses in English grammar basics',
  'present-simple': 'present simple tense English grammar',
  'past-simple': 'past simple tense English grammar',
  'future-simple': 'future simple tense will English grammar',
  modals: 'modal verbs English grammar',
  'wh-questions': 'wh questions English grammar',
  punctuation: 'punctuation marks English grammar',
  'voice-intro': 'active and passive voice English grammar',
  'passive-advanced': 'passive voice advanced English grammar',
  agreement: 'subject verb agreement English grammar',
  'present-perfect': 'present perfect tense English grammar',
  'past-perfect': 'past perfect tense English grammar',
  'reported-speech': 'reported speech English grammar',
  conditionals: 'conditionals English grammar',
  clauses: 'clauses in English grammar',
  'gerund-infinitive': 'gerund vs infinitive English grammar',
  parallelism: 'parallelism in English grammar',
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
          },
        },
        (res) => {
          const encoding = String(res.headers['content-encoding'] ?? '').toLowerCase()
          /** @type {import('stream').Readable} */
          let stream = res
          if (encoding.includes('br')) stream = res.pipe(zlib.createBrotliDecompress())
          else if (encoding.includes('gzip')) stream = res.pipe(zlib.createGunzip())
          else if (encoding.includes('deflate')) stream = res.pipe(zlib.createInflate())

          let data = ''
          stream.on('data', (chunk) => (data += chunk))
          stream.on('end', () => resolve(data))
          stream.on('error', reject)
        },
      )
      .on('error', reject)
  })
}

function parseCliArgs(argv) {
  const debug = argv.includes('--debug')
  const maybeKey = argv[2]
  const debugKey = maybeKey && maybeKey !== '--debug' ? maybeKey : null
  return { debug, debugKey }
}

function buildSearchUrl(query) {
  const params = new URLSearchParams({
    search_query: query,
    sp: 'EgIQAQ==', // Videos only
    hl: 'en',
  })
  return `https://www.youtube.com/results?${params.toString()}`
}

function debugLog({ key, url, html }) {
  const head = html.slice(0, 1500)
  console.log('--- DEBUG', key, '---')
  console.log('url:', url)
  console.log('has videoId:', html.includes('videoId'))
  console.log(head)
  console.log('--- END DEBUG ---')
}

function extractVideoIds(html) {
  const ids = []
  const maxIds = 50

  const re1 = /"videoId":"([a-zA-Z0-9_-]{11})"/g
  let m
  while ((m = re1.exec(html))) {
    ids.push(m[1])
    if (ids.length > maxIds) break
  }

  if (ids.length) return ids

  const re2 = /\/watch\?v=([a-zA-Z0-9_-]{11})/g
  while ((m = re2.exec(html))) {
    ids.push(m[1])
    if (ids.length > maxIds) break
  }

  return ids
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function resolveVideoIdForQuery({ key, query, debug }) {
  const url = buildSearchUrl(query)
  const html = await fetch(url)

  if (debug) debugLog({ key, url, html })

  const ids = extractVideoIds(html)
  const uniq = [...new Set(ids)]
  return uniq[0] ?? null
}

async function main() {
  const out = {}

  const { debug, debugKey } = parseCliArgs(process.argv)

  for (const [key, q] of Object.entries(queries)) {
    if (debugKey && key !== debugKey) continue
    try {
      out[key] = await resolveVideoIdForQuery({ key, query: q, debug })
    } catch (error) {
      if (debug) {
        const message = error && typeof error === 'object' && 'message' in error ? String(error.message) : String(error)
        console.warn('WARN:', key, 'failed to resolve videoId:', message)
      }
      out[key] = null
    }

    await sleep(1500)
  }

  console.log(JSON.stringify(out, null, 2))
}

main()
