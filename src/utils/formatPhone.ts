/**
 * Formats a phone number for display, grouping digits in threes with a
 * space between groups (e.g. "972364725" → "972 364 725") so it's easier to
 * read at a glance. Only affects how the number is *shown* — always pass
 * the original, unformatted value to a `tel:` link's href, since some
 * dialers don't like spaces.
 *
 * A leading international prefix (e.g. "+34" for Spain) is its own separate
 * group and doesn't count towards the 3-digit grouping of the rest of the
 * number — "+34972364725" becomes "+34 972 364 725", not "+349 723 647 25".
 */
export function formatPhoneDisplay(phone: string): string {
  const trimmed = phone.trim()
  const plusMatch = trimmed.match(/^\+(\d{2})/)
  const rest = plusMatch ? trimmed.slice(plusMatch[0].length) : trimmed
  const digits = rest.replace(/\D/g, '')
  if (!digits && !plusMatch) return phone

  const groups = digits.match(/.{1,3}/g) ?? []
  const prefix = plusMatch ? `+${plusMatch[1]} ` : ''
  return prefix + groups.join(' ')
}
