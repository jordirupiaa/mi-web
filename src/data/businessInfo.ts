/**
 * Real, confirmed facts about Hotel Casa Mas, hard-coded here as plain data.
 * This site has no backend at all — reservations go through the
 * direct-book.com booking engine (see src/utils/directBook.ts) and every
 * enquiry is answered by phone, email or the on-site chat widget, so a
 * database round-trip for a handful of facts that essentially never change
 * would add a moving part with nothing to gain. Update this file directly
 * if any of these details change.
 */
export const BUSINESS_INFO = {
  name: 'Hotel Casa Mas',
  /** Used for tel: links — digits and leading + only, no spaces. */
  phone: '+34625360056',
  email: 'hotelcasamas@gmail.com',
  address: 'Carrer de Sant Pere 50, 17310 Lloret de Mar, Girona',
}
