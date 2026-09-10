/**
 * Small, dependency-free fuzzy matcher for the FAQ chat widget.
 *
 * No external API, no ML model — just normalized token overlap between the
 * visitor's question and the hand-written phrasing "variants" of each FAQ
 * entry (see src/data/faq.ts). Good enough for a few dozen fixed topics; not
 * meant to be a general-purpose search engine.
 */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents so "cancelación" ~ "cancelacion"
    .replace(/[¿?¡!.,;:()"'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Pure grammatical filler — articles, prepositions, pronouns, and the small
 * set of courtesy/modal verbs ("quiero", "puedo", "me gustaría"...) visitors
 * wrap around their real question. None of these carry topic-specific
 * meaning on their own, and a real, elaborately-phrased question ("Buenos
 * días, quería preguntar si el hotel tiene aparcamiento cerca porque...")
 * is mostly made of them — left in, they dilute the token overlap score
 * against the short, hand-written variants until a long-but-relevant
 * question no longer clears the match threshold. Stripped from both the
 * visitor's query and every candidate variant (same tokenize() call), so
 * the comparison stays symmetric: this only removes noise, it never
 * introduces an asymmetric advantage for either side.
 *
 * Deliberately excludes any word that is itself the entire content of the
 * small-talk topics (hola/hi/bonjour/gracias/thanks/danke/adiós/bye...) —
 * those must survive tokenization or greeting/thanks/goodbye recognition
 * would break.
 */
const STOPWORDS = new Set([
  // Spanish
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'en', 'y', 'o', 'u', 'a',
  'ante', 'bajo', 'con', 'contra', 'desde', 'durante', 'entre', 'hacia', 'hasta', 'mediante', 'para',
  'por', 'segun', 'sin', 'sobre', 'tras', 'que', 'como', 'cual', 'cuales', 'quien', 'quienes',
  'es', 'soy', 'eres', 'somos', 'sois', 'son', 'esta', 'estoy', 'estamos', 'estan', 'ser', 'estar',
  'hay', 'tener', 'tengo', 'tiene', 'tenemos', 'tienen', 'teneis', 'puedo', 'puede', 'podemos',
  'pueden', 'podeis', 'quiero', 'quiere', 'queremos', 'quieren', 'quereis', 'queria', 'querria',
  'gustaria', 'necesito', 'necesita', 'necesitamos', 'necesitan', 'deseo', 'desea',
  'me', 'te', 'se', 'nos', 'os', 'le', 'les', 'lo', 'mi', 'mis', 'tu', 'tus', 'su', 'sus',
  'nuestro', 'nuestra', 'nuestros', 'nuestras', 'yo', 'nosotros', 'nosotras', 'vosotros', 'vosotras',
  'ellos', 'ellas', 'usted', 'ustedes', 'favor', 'si', 'no', 'ya', 'muy', 'mas', 'tambien', 'pero',
  'porque', 'aunque', 'entonces', 'asi', 'algo', 'alguna', 'alguno', 'algunos', 'algunas',
  'esto', 'eso', 'ese', 'esa', 'estos', 'esos', 'estas', 'esas', 'este', 'perdona', 'perdon', 'oye',
  'voy', 'vas', 'va', 'vamos', 'vais', 'van', 'vaya', 'vayamos', 'ire', 'iras', 'ira', 'iremos', 'iran',
  // English
  'the', 'a', 'an', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'from', 'by', 'and', 'or', 'is',
  'are', 'am', 'was', 'were', 'be', 'being', 'been', 'have', 'has', 'had',
  'can', 'could', 'will', 'would', 'should', 'i', 'you', 'he', 'she', 'we', 'they', 'him', 'her',
  'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their', 'this', 'that', 'these', 'those',
  'there', 'here', 'what', 'which', 'who', 'whom', 'how', 'please', 'sorry', 'excuse',
  // French
  'le', 'les', 'un', 'une', 'des', 'du', 'au', 'aux', 'et', 'ou', 'a', 'dans', 'sur', 'sous', 'pour',
  'par', 'avec', 'sans', 'entre', 'vers', 'chez', 'ce', 'cet', 'cette', 'ces', 'que', 'qui', 'quoi',
  'comment', 'est', 'suis', 'sommes', 'etes', 'sont', 'etre', 'avoir', 'ai', 'as', 'avons', 'avez',
  'ont', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent', 'veux', 'veut', 'voulons', 'voulez',
  'veulent', 'je', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'lui', 'leur', 'mon', 'ma', 'mes',
  'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre', 'votre', 'plus', 'tres', 'mais', 'donc', 'alors',
  'aussi', 'svp', 'stp', 'pardon',
  // Catalan
  'el', 'els', 'les', 'un', 'uns', 'unes', 'del', 'al', 'en', 'i', 'amb', 'per', 'sense', 'que',
  'qui', 'com', 'es', 'esta', 'soc', 'ets', 'som', 'sou', 'son', 'tinc', 'te', 'tens', 'tenim',
  'teniu', 'tenen', 'puc', 'pot', 'podem', 'podeu', 'poden', 'vull', 'vol', 'volem', 'voleu',
  'volen', 'voldria', 'necessito', 'necessita', 'jo', 'ell', 'ella', 'nosaltres', 'vosaltres',
  'ells', 'elles', 'em', 'et', 'ens', 'us', 'li', 'meu', 'meva', 'teu', 'teva', 'seu', 'seva',
  'nostre', 'vostre', 'molt', 'pero', 'doncs', 'perdo', 'perdoni',
  // German
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines',
  'und', 'oder', 'zu', 'im', 'an', 'am', 'auf', 'fur', 'mit', 'ohne', 'von', 'vom', 'bei', 'nach',
  'ist', 'sind', 'bin', 'bist', 'seid', 'war', 'waren', 'sein', 'haben', 'habe', 'hast', 'hat',
  'habt', 'kann', 'kannst', 'konnen', 'konnt', 'will', 'willst', 'wollen', 'wollt', 'mochte',
  'mochtest', 'mochten', 'mochtet', 'brauche', 'braucht', 'brauchen', 'ich', 'du', 'er', 'sie',
  'es', 'wir', 'ihr', 'mich', 'dich', 'sich', 'uns', 'euch', 'mein', 'meine', 'dein', 'deine',
  'seine', 'ihre', 'unser', 'unsere', 'euer', 'eure', 'sehr', 'auch', 'aber', 'also', 'bitte',
  'entschuldigung',
  // Italian
  'il', 'lo', 'gli', 'un', 'uno', 'una', 'di', 'dello', 'della', 'dei', 'degli', 'delle', 'e',
  'o', 'ad', 'su', 'per', 'con', 'senza', 'tra', 'fra', 'che', 'chi', 'come', 'sono', 'sei',
  'siamo', 'siete', 'essere', 'avere', 'ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno', 'posso',
  'puoi', 'puo', 'possiamo', 'potete', 'possono', 'voglio', 'vuoi', 'vuole', 'vogliamo', 'volete',
  'vogliono', 'vorrei', 'io', 'tu', 'lui', 'lei', 'noi', 'voi', 'loro', 'mi', 'ti', 'ci', 'vi',
  'mio', 'mia', 'tuo', 'tua', 'suo', 'sua', 'nostro', 'vostro', 'molto', 'anche', 'ma', 'quindi',
  'scusa', 'scusi',
])

/**
 * Distinct tokens only — a phrase like "ciao ciao" must not out-score "ciao"
 * just by repeating a word.
 *
 * Falls back to keeping stopwords if removing them would empty out an
 * otherwise non-empty phrase (e.g. a hypothetical variant that's only
 * grammatical filler) — src/data/faq.ts is written to be edited by hotel
 * staff, not just developers, so a future variant made entirely of common
 * words should degrade to a weaker match, not silently become permanently
 * unmatchable with no error anywhere to signal it.
 */
function tokenize(text: string): Set<string> {
  const words = normalize(text).split(' ').filter((word) => word.length > 1)
  const withoutStopwords = words.filter((word) => !STOPWORDS.has(word))
  return new Set(withoutStopwords.length > 0 ? withoutStopwords : words)
}

/** Classic edit-distance between two strings — used only by tokensMatch() below for light typo tolerance, not as a general spellchecker. */
function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  let prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const curr = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost)
    }
    prev = curr
  }
  return prev[b.length]
}

/**
 * Two tokens count as "the same word" if they're identical, or if both are
 * long enough (4+ letters) and differ by at most one typo — e.g. "tenjo" ~
 * "tengo", "chek" ~ "check", "aparcaminento" ~ "aparcamiento". Deliberately
 * conservative: short words are excluded (a 1-letter edit can flip their
 * meaning, e.g. "no"/"sí"), so this never turns into a general spellchecker,
 * just forgiveness for the kind of slip a visitor typing on a phone
 * actually makes.
 *
 * This used to allow 2 edits for 7+-letter words, on the reasoning that a
 * bigger typo in a longer word is still obviously the same word. In
 * practice it wasn't: "apartamento" and "aparcamiento" are two completely
 * different, entirely real Spanish words that happen to be exactly 2 edits
 * apart, and a guest asking about the *apartment's* capacity ("el
 * apartamento que aforo tiene") got a wrong, unrelated answer about
 * *parking* as a result. The one case that motivated the wider tolerance
 * ("aparcaminento" ~ "aparcamiento") turns out to only need 1 edit anyway —
 * so there was nothing to lose by tightening this back up.
 */
function tokensMatch(a: string, b: string): boolean {
  if (a === b) return true
  if (a.length < 4 || b.length < 4) return false
  if (Math.abs(a.length - b.length) > 1) return false
  return levenshtein(a, b) <= 1
}

/**
 * How many distinct topics use a given (post-stopword) token anywhere in
 * their phrasing — the basis for weighting matches by how distinctive the
 * matched word actually is. Built fresh per findBestMatch() call from
 * whatever `entries` were passed in, so it adapts automatically to
 * whatever FAQ list is in use rather than hard-coding word rarity.
 */
function buildDocFrequency<T>(entries: MatchableEntry<T>[]): Map<string, number> {
  const df = new Map<string, number>()
  for (const entry of entries) {
    const seenInEntry = new Set<string>()
    for (const variant of entry.variants) {
      for (const token of tokenize(variant)) seenInEntry.add(token)
    }
    for (const token of seenInEntry) df.set(token, (df.get(token) ?? 0) + 1)
  }
  return df
}

/**
 * A word used by only one or two topics ("perro", "aparcamiento") is a much
 * stronger signal that a message is *about* that topic than a word shared
 * across a dozen of them ("hotel", "habitación") — plain token-overlap
 * counting treats both the same, which is why a single, perfectly on-topic
 * word ("perro") in an otherwise ordinarily-phrased question ("es posible
 * alojarnos con él en el hotel") could still score too low: with only one
 * matched token among several, overlap alone can't tell "the one word that
 * matched happens to be the whole point" apart from "the one word that
 * matched is a coincidence". Classic inverse-document-frequency weighting
 * fixes that: rarer (across topics) tokens count for more.
 */
function idfWeight(token: string, df: Map<string, number>, totalEntries: number): number {
  const freq = df.get(token) ?? 1
  return Math.log(1 + totalEntries / freq)
}

interface PhraseScore {
  score: number
  /** Normalized character length of the matched phrase — used only to break ties in favor of the more specific (longer) phrasing, e.g. "ciao ciao" over "ciao". */
  specificity: number
}

/** How well a single candidate phrase matches the visitor's query. */
function scorePhrase(
  queryNormalized: string,
  queryTokens: Set<string>,
  phrase: string,
  df: Map<string, number>,
  totalEntries: number
): PhraseScore {
  const phraseNormalized = normalize(phrase)
  const phraseTokens = tokenize(phrase)
  // Tie-break metric favors the phrase with more *meaningful* (post-stopword)
  // tokens, not more raw characters — otherwise a phrase padded with
  // grammatical filler ("a quién pregunto durante mi estancia", 2 real
  // tokens once "a/quién/durante/mi" are stripped) reads as more "specific"
  // than a tighter, equally-relevant phrase ("aire acondicionado", also 2
  // tokens) purely because its unfiltered string is longer — even though
  // both matched the same number of real concepts. The tiny fractional term
  // only breaks a tie between phrases with the identical token count.
  const specificity = phraseTokens.size + phraseNormalized.length / 10000
  if (phraseTokens.size === 0 || queryTokens.size === 0) {
    return { score: 0, specificity }
  }

  let weightedOverlap = 0
  let phraseWeightTotal = 0
  for (const token of phraseTokens) {
    const weight = idfWeight(token, df, totalEntries)
    phraseWeightTotal += weight
    if (queryTokens.has(token)) {
      weightedOverlap += weight
      continue
    }
    for (const queryToken of queryTokens) {
      if (tokensMatch(token, queryToken)) {
        weightedOverlap += weight
        break
      }
    }
  }
  // Precision/recall combined (F1), not overlap over just the shorter side.
  // Using only the shorter side let one incidental shared word ("vale" — a
  // greeting filler word, but also literally inside "cuánto vale la
  // habitación") score a "perfect" 1.0 against a totally unrelated 4-word
  // query, beating the genuinely relevant, longer pricing phrase. F1 still
  // lets a short exact keyword ("wifi") score perfectly against a query
  // that's *just* that keyword, but no longer rewards a short phrase for
  // merely appearing somewhere inside a much longer, mostly-unrelated query.
  // Both precision and overlap below are IDF-weighted (see idfWeight): a
  // matched word shared by many topics barely moves the score, one unique
  // to a single topic moves it a lot.
  const precision = phraseWeightTotal > 0 ? weightedOverlap / phraseWeightTotal : 0
  // A real, elaborately-phrased question ("Buenos días, quería preguntar
  // si..., porque vamos a venir en coche desde Francia y no sé dónde
  // aparcar") can easily run to 10-15 content words once greeting/courtesy
  // filler is stripped, most of which are just that visitor's own narration
  // and will never appear in any short, hand-written variant. Computing
  // recall against the *raw* query length would keep punishing the match
  // for every extra word past the point that's already informative, until a
  // genuinely relevant topic no longer clears the threshold — which is
  // exactly the "doesn't understand longer questions" failure this widget
  // was reported to have. Capping the denominator stops the penalty from
  // growing without bound past a reasonably-informative question length,
  // while still applying it in full below the cap — so a short, coincidental
  // one-word overlap inside an otherwise unrelated 3-4 word query (the
  // "vale" scenario below) is still caught.
  const RECALL_CAP = 5
  const recall = weightedOverlap / Math.min(queryTokens.size, RECALL_CAP)
  const beta = 0.6
  const betaSq = beta * beta
  let score =
    betaSq * precision + recall > 0 ? ((1 + betaSq) * precision * recall) / (betaSq * precision + recall) : 0

  // An exact match ("ciao" said as a greeting) is the strongest signal.
  // A substring match (one phrase fully contains the other) is weaker, and
  // is scaled by how much of the longer string the shorter one actually
  // covers — "vale" is a substring of "cuanto vale la habitacion", but it's
  // only a sliver of it, so it earns a small nudge, not a large one. Below
  // MIN_COVERAGE it earns nothing at all: a short courtesy phrase like
  // "buenos días" is very often the literal, contiguous opening words of an
  // otherwise unrelated, much longer question ("Buenos días, quería
  // preguntar si... aparcamiento...") — with no coverage floor, that
  // coincidental contiguity out-scores the real, on-topic words even when
  // they match with equal precision, just because those words happen to be
  // scattered through the sentence instead of sitting next to each other.
  const MIN_COVERAGE = 0.25
  if (queryNormalized === phraseNormalized) {
    score += 1
  } else if (queryNormalized.includes(phraseNormalized) || phraseNormalized.includes(queryNormalized)) {
    const shorter = Math.min(queryNormalized.length, phraseNormalized.length)
    const longer = Math.max(queryNormalized.length, phraseNormalized.length)
    const coverage = shorter / longer
    if (coverage >= MIN_COVERAGE) score += 0.5 * coverage
  }

  return { score, specificity }
}

export interface MatchableEntry<T> {
  id: string
  variants: string[]
  data: T
}

/** Returns the best-matching entry, or null if nothing clears the confidence threshold. */
export function findBestMatch<T>(query: string, entries: MatchableEntry<T>[], threshold = 0.6): MatchableEntry<T> | null {
  const queryNormalized = normalize(query)
  const queryTokens = tokenize(query)
  if (queryTokens.size === 0) return null

  const df = buildDocFrequency(entries)
  let best: { entry: MatchableEntry<T>; score: number; specificity: number } | null = null

  for (const entry of entries) {
    for (const variant of entry.variants) {
      const { score, specificity } = scorePhrase(queryNormalized, queryTokens, variant, df, entries.length)
      // On a tie, prefer the more specific (longer) phrase — e.g. a two-word
      // farewell like "ciao ciao" should win over a one-word greeting "ciao"
      // when both score the same, rather than whichever topic came first.
      const better = !best || score > best.score || (score === best.score && specificity > best.specificity)
      if (better) {
        best = { entry, score, specificity }
      }
    }
  }

  if (!best || best.score < threshold) return null
  return best.entry
}

/** Replaces {{placeholders}} in an FAQ answer with live values (e.g. the hotel's address). */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => values[key] ?? match)
}
