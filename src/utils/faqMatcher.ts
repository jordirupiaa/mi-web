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

/** Distinct tokens only — a phrase like "ciao ciao" must not out-score "ciao" just by repeating a word. */
function tokenize(text: string): Set<string> {
  const words = normalize(text)
    .split(' ')
    .filter((word) => word.length > 1)
  return new Set(words)
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
 * "tengo", "chek" ~ "check". Deliberately conservative: short words are
 * excluded (a 1-letter edit can flip their meaning, e.g. "no"/"sí"), so this
 * never turns into a general spellchecker, just forgiveness for the kind of
 * slip a visitor typing on a phone actually makes.
 */
function tokensMatch(a: string, b: string): boolean {
  if (a === b) return true
  if (a.length < 4 || b.length < 4) return false
  if (Math.abs(a.length - b.length) > 1) return false
  return levenshtein(a, b) <= 1
}

interface PhraseScore {
  score: number
  /** Normalized character length of the matched phrase — used only to break ties in favor of the more specific (longer) phrasing, e.g. "ciao ciao" over "ciao". */
  specificity: number
}

/** How well a single candidate phrase matches the visitor's query. */
function scorePhrase(queryNormalized: string, queryTokens: Set<string>, phrase: string): PhraseScore {
  const phraseNormalized = normalize(phrase)
  const phraseTokens = tokenize(phrase)
  if (phraseTokens.size === 0 || queryTokens.size === 0) {
    return { score: 0, specificity: phraseNormalized.length }
  }

  let overlap = 0
  for (const token of phraseTokens) {
    if (queryTokens.has(token)) {
      overlap++
      continue
    }
    for (const queryToken of queryTokens) {
      if (tokensMatch(token, queryToken)) {
        overlap++
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
  const precision = overlap / phraseTokens.size
  const recall = overlap / queryTokens.size
  let score = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0

  // An exact match ("ciao" said as a greeting) is the strongest signal.
  // A substring match (one phrase fully contains the other) is weaker, and
  // is scaled by how much of the longer string the shorter one actually
  // covers — "vale" is a substring of "cuanto vale la habitacion", but it's
  // only a sliver of it, so it earns a small nudge, not a large one.
  if (queryNormalized === phraseNormalized) {
    score += 1
  } else if (queryNormalized.includes(phraseNormalized) || phraseNormalized.includes(queryNormalized)) {
    const shorter = Math.min(queryNormalized.length, phraseNormalized.length)
    const longer = Math.max(queryNormalized.length, phraseNormalized.length)
    score += 0.5 * (shorter / longer)
  }

  return { score, specificity: phraseNormalized.length }
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

  let best: { entry: MatchableEntry<T>; score: number; specificity: number } | null = null

  for (const entry of entries) {
    for (const variant of entry.variants) {
      const { score, specificity } = scorePhrase(queryNormalized, queryTokens, variant)
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
