import type { RoomSlug } from './rooms'

/**
 * Per-language name/description for each of the six real room types,
 * keyed directly by the room's `slug` (see src/data/rooms.ts) — no more
 * matching against free-text from a database, since the room list is now
 * static and fully known.
 */

interface RoomText {
  name: string
  description: string
}

type Language = 'es' | 'en' | 'fr' | 'ca' | 'de' | 'it'

const ROOM_TEXT: Record<RoomSlug, Record<Language, RoomText>> = {
  individual: {
    es: { name: 'Habitación Individual', description: 'Alojamiento confortable para un huésped, con una cama, baño privado con ducha, armario, caja fuerte, patio y vistas a la ciudad.' },
    en: { name: 'Single Room', description: 'Comfortable accommodation for one guest with one bed, private bathroom, shower, wardrobe, safe deposit box, patio and city views.' },
    fr: { name: 'Chambre Simple', description: 'Hébergement confortable pour une personne avec un lit, salle de bains privée, douche, armoire, coffre-fort, patio et vue sur la ville.' },
    ca: { name: 'Habitació Individual', description: 'Allotjament confortable per a un hoste amb un llit, bany privat, dutxa, armari, caixa forta, pati i vistes a la ciutat.' },
    de: { name: 'Einzelzimmer', description: 'Komfortable Unterkunft für einen Gast mit einem Bett, eigenem Bad, Dusche, Kleiderschrank, Safe, Innenhof und Stadtblick.' },
    it: { name: 'Camera Singola', description: 'Sistemazione confortevole per un ospite con un letto, bagno privato, doccia, armadio, cassaforte, patio e vista città.' },
  },
  'twin-ventana': {
    es: { name: 'Habitación Doble con Ventana', description: 'Habitación doble confortable con dos camas, baño privado con ducha, armario, caja fuerte y vistas a la ciudad.' },
    en: { name: 'Twin Room with Window', description: 'Comfortable twin room with two beds, private bathroom, shower, wardrobe, safe deposit box and city views.' },
    fr: { name: 'Chambre Twin avec Fenêtre', description: 'Chambre twin confortable avec deux lits, salle de bains privée, douche, armoire, coffre-fort et vue sur la ville.' },
    ca: { name: 'Habitació Twin amb Finestra', description: 'Habitació twin confortable amb dos llits, bany privat, dutxa, armari, caixa forta i vistes a la ciutat.' },
    de: { name: 'Zweibettzimmer mit Fenster', description: 'Komfortables Zweibettzimmer mit zwei Betten, eigenem Bad, Dusche, Kleiderschrank, Safe und Stadtblick.' },
    it: { name: 'Camera Twin con Finestra', description: 'Confortevole camera twin con due letti, bagno privato, doccia, armadio, cassaforte e vista città.' },
  },
  'twin-balcon': {
    es: { name: 'Habitación Doble con Balcón', description: 'Habitación doble confortable con dos camas, baño privado con ducha, armario, caja fuerte, balcón privado y vistas a la ciudad.' },
    en: { name: 'Twin Room with Balcony', description: 'Comfortable twin room with two beds, private bathroom, shower, wardrobe, safe deposit box, private balcony and city views.' },
    fr: { name: 'Chambre Twin avec Balcon', description: 'Chambre twin confortable avec deux lits, salle de bains privée, douche, armoire, coffre-fort, balcon privé et vue sur la ville.' },
    ca: { name: 'Habitació Twin amb Balcó', description: 'Habitació twin confortable amb dos llits, bany privat, dutxa, armari, caixa forta, balcó privat i vistes a la ciutat.' },
    de: { name: 'Zweibettzimmer mit Balkon', description: 'Komfortables Zweibettzimmer mit zwei Betten, eigenem Bad, Dusche, Kleiderschrank, Safe, privatem Balkon und Stadtblick.' },
    it: { name: 'Camera Twin con Balcone', description: 'Confortevole camera twin con due letti, bagno privato, doccia, armadio, cassaforte, balcone privato e vista città.' },
  },
  triple: {
    es: { name: 'Habitación Triple', description: 'Habitación triple práctica con tres camas, baño privado con ducha, armario, caja fuerte y vistas al patio interior o a la ciudad.' },
    en: { name: 'Triple Room', description: 'Practical triple room with three beds, private bathroom, shower, wardrobe, safe deposit box and interior courtyard or city views.' },
    fr: { name: 'Chambre Triple', description: 'Chambre triple pratique avec trois lits, salle de bains privée, douche, armoire, coffre-fort et vue sur la cour intérieure ou la ville.' },
    ca: { name: 'Habitació Triple', description: 'Habitació triple pràctica amb tres llits, bany privat, dutxa, armari, caixa forta i vistes al pati interior o a la ciutat.' },
    de: { name: 'Dreibettzimmer', description: 'Praktisches Dreibettzimmer mit drei Betten, eigenem Bad, Dusche, Kleiderschrank, Safe und Blick auf den Innenhof oder die Stadt.' },
    it: { name: 'Camera Tripla', description: 'Pratica camera tripla con tre letti, bagno privato, doccia, armadio, cassaforte e vista sul cortile interno o sulla città.' },
  },
  cuadruple: {
    es: { name: 'Habitación Cuádruple', description: 'Habitación cuádruple amplia con cuatro camas, baño privado, armario, caja fuerte y vistas a la terraza o a la ciudad.' },
    en: { name: 'Quadruple Room', description: 'Spacious quadruple room with four beds, private bathroom, wardrobe, safe deposit box and terrace or city views.' },
    fr: { name: 'Chambre Quadruple', description: "Chambre quadruple spacieuse avec quatre lits, salle de bains privée, armoire, coffre-fort et vue sur la terrasse ou la ville." },
    ca: { name: 'Habitació Quàdruple', description: 'Habitació quàdruple àmplia amb quatre llits, bany privat, armari, caixa forta i vistes a la terrassa o a la ciutat.' },
    de: { name: 'Vierbettzimmer', description: 'Geräumiges Vierbettzimmer mit vier Betten, eigenem Bad, Kleiderschrank, Safe und Terrassen- oder Stadtblick.' },
    it: { name: 'Camera Quadrupla', description: 'Spaziosa camera quadrupla con quattro letti, bagno privato, armadio, cassaforte e vista terrazza o città.' },
  },
  atico: {
    es: { name: 'Apartamento Ático', description: 'Amplio apartamento dúplex con cuatro dormitorios independientes, tres baños, cocina totalmente equipada, frigorífico, lavavajillas, menaje de cocina, terraza, mobiliario exterior y vistas al mar.' },
    en: { name: 'Penthouse Apartment', description: 'Spacious duplex apartment with four separate bedrooms, three bathrooms, a fully equipped kitchen, refrigerator, dishwasher, kitchenware, terrace, outdoor furniture and sea views.' },
    fr: { name: 'Appartement Penthouse', description: 'Spacieux appartement duplex avec quatre chambres séparées, trois salles de bains, cuisine entièrement équipée, réfrigérateur, lave-vaisselle, ustensiles de cuisine, terrasse, mobilier extérieur et vue sur mer.' },
    ca: { name: 'Apartament Àtic', description: 'Ampli apartament dúplex amb quatre dormitoris independents, tres banys, cuina totalment equipada, frigorífic, rentavaixella, estris de cuina, terrassa, mobiliari exterior i vistes al mar.' },
    de: { name: 'Penthouse-Apartment', description: 'Geräumiges Maisonette-Apartment mit vier separaten Schlafzimmern, drei Bädern, voll ausgestatteter Küche, Kühlschrank, Geschirrspüler, Küchenutensilien, Terrasse, Außenmöbeln und Meerblick.' },
    it: { name: 'Appartamento Attico', description: 'Spazioso appartamento duplex con quattro camere separate, tre bagni, cucina completamente attrezzata, frigorifero, lavastoviglie, utensili da cucina, terrazza, mobili da esterno e vista mare.' },
  },
}

export function translateRoom(slug: RoomSlug, language: string): RoomText {
  const perLanguage = ROOM_TEXT[slug]
  return perLanguage[language as Language] ?? perLanguage.es
}
