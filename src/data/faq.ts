/**
 * ============================================================================
 *  FAQ CONTENT FOR THE CHAT WIDGET — edit this file to add/change questions.
 * ============================================================================
 *
 * Nothing else in the widget needs to change when you edit FAQs — just this
 * array. Each entry is one topic, with:
 *
 *   - id:        a short internal name, doesn't need to be unique in any
 *                special way, just used for React's key prop.
 *   - variants:  per language, a list of ways a visitor might phrase that
 *                question — include short one-word versions too (e.g. just
 *                "wifi") as well as full sentences. The more variants you
 *                add, the better the widget recognizes different phrasings.
 *                These are NOT shown to the visitor, they're only used for
 *                matching.
 *   - answer:    per language, the actual reply text. You can use
 *                {{address}}, {{phone}} or {{email}} inside an answer and
 *                they'll be swapped for the hotel's real, live contact
 *                details from business_settings automatically.
 *
 * To ADD a new question: copy one of the objects below, give it a new id,
 * fill in variants/answers for every language (or at least "es" — the
 * widget falls back to Spanish if a language is missing), done.
 *
 * All the facts in these answers come directly from the rest of this site
 * (business_settings, the policies table, hotelFacts) — nothing here is
 * invented. If you add a new FAQ, keep that same rule: only real, confirmed
 * information about the hotel.
 */

export type FaqLanguage = 'es' | 'en' | 'fr' | 'ca' | 'de' | 'it'

export interface FaqTopic {
  id: string
  variants: Record<FaqLanguage, string[]>
  answer: Record<FaqLanguage, string>
}

export const FAQ_TOPICS: FaqTopic[] = [
  {
    // Greetings and other small talk ("hola", "hello"...) get their own
    // reply instead of falling through to the "I don't know that" fallback.
    id: 'greeting',
    variants: {
      es: ['hola', 'buenas', 'hey', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal', 'hola buenas', 'hola, buenas', 'saludos'],
      en: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'hiya'],
      fr: ['bonjour', 'salut', 'coucou', 'bonsoir', 'bonne journée'],
      ca: ['hola', 'bon dia', 'bona tarda', 'bona nit', 'ei', 'salutacions'],
      de: ['hallo', 'guten tag', 'guten morgen', 'guten abend', 'servus', 'hi', 'hi hallo'],
      it: ['ciao', 'salve', 'buongiorno', 'buonasera', 'buon pomeriggio'],
    },
    answer: {
      es: '¡Hola! Un placer saludarle. ¿En qué puedo ayudarle sobre su reserva o estancia en el hotel?',
      en: 'Hello! Lovely to hear from you. How may I help with your booking or stay at the hotel?',
      fr: 'Bonjour ! Ravi de vous saluer. En quoi puis-je vous aider concernant votre réservation ou votre séjour à l\'hôtel ?',
      ca: 'Hola! Un plaer saludar-lo. En què el puc ajudar sobre la seva reserva o estada a l\'hotel?',
      de: 'Hallo! Es freut mich, von Ihnen zu hören. Wie kann ich Ihnen zu Ihrer Buchung oder Ihrem Aufenthalt im Hotel helfen?',
      it: 'Salve! Un piacere sentirla. Come posso aiutarla riguardo alla sua prenotazione o al suo soggiorno in hotel?',
    },
  },
  {
    // Common small talk that isn't really a question but needs a normal
    // reply anyway, instead of the "I don't have that information" fallback.
    id: 'thanks',
    variants: {
      es: ['gracias', 'muchas gracias', 'genial gracias', 'perfecto gracias', 'muchísimas gracias', 'vale gracias', 'ok', 'vale', 'entendido', 'perfecto', 'genial'],
      en: ['thank you', 'thanks', 'thanks a lot', 'thank you very much', 'ok thanks', 'ok', 'got it', 'perfect', 'great'],
      fr: ['merci', 'merci beaucoup', 'merci infiniment', "merci d'avance", 'ok', "d'accord", 'parfait', 'entendu'],
      ca: ['gràcies', 'moltes gràcies', 'gràcies mil', 'ok', 'val', 'entesos', 'perfecte', 'genial'],
      de: ['danke', 'vielen dank', 'danke schön', 'dankeschön', 'ok', 'alles klar', 'verstanden', 'perfekt', 'super'],
      it: ['grazie', 'grazie mille', 'grazie infinite', 'ok', 'va bene', 'capito', 'perfetto', 'ottimo'],
    },
    answer: {
      es: '¡A usted! Quedo a su entera disposición si necesita cualquier otra aclaración. ¡Que tenga un excelente día!',
      en: "You're very welcome! I remain at your disposal for anything else you may need. Have a wonderful day!",
      fr: 'Je vous en prie ! Je reste à votre entière disposition pour toute autre précision. Excellente journée à vous !',
      ca: 'A vostè! Quedo a la seva entera disposició per a qualsevol altre aclariment. Que tingui un molt bon dia!',
      de: 'Sehr gerne! Ich stehe Ihnen für weitere Fragen jederzeit zur Verfügung. Einen wunderschönen Tag noch!',
      it: 'Grazie a lei! Resto a sua completa disposizione per qualsiasi altro chiarimento. Le auguro un\'ottima giornata!',
    },
  },
  {
    id: 'goodbye',
    variants: {
      es: ['adiós', 'hasta luego', 'nos vemos', 'chao', 'hasta pronto', 'me despido', 'que vaya bien'],
      en: ['bye', 'goodbye', 'see you', 'see you later', 'farewell', 'bye bye'],
      fr: ['au revoir', 'à bientôt', 'à plus tard', 'salut à bientôt'],
      ca: ['adéu', 'fins aviat', 'fins després', 'ens veiem', 'que vagi bé'],
      de: ['tschüss', 'auf wiedersehen', 'bis bald', 'ciao tschüss'],
      it: ['arrivederci', 'a presto', 'ciao ciao', 'ci vediamo'],
    },
    answer: {
      es: '¡Gracias por visitarnos! Esperamos recibirle muy pronto en Hotel Casa Mas. ¡Buen viaje!',
      en: 'Thank you for visiting us! We hope to welcome you very soon at Hotel Casa Mas. Safe travels!',
      fr: 'Merci de votre visite ! Nous espérons vous accueillir très bientôt à l\'Hotel Casa Mas. Bon voyage !',
      ca: 'Gràcies per visitar-nos! Esperem rebre\'l ben aviat a l\'Hotel Casa Mas. Bon viatge!',
      de: 'Vielen Dank für Ihren Besuch! Wir freuen uns, Sie bald im Hotel Casa Mas begrüßen zu dürfen. Gute Reise!',
      it: 'Grazie per averci visitato! Speriamo di darle presto il benvenuto all\'Hotel Casa Mas. Buon viaggio!',
    },
  },
  {
    // Someone signalling they have a question without asking it yet ("I have
    // a query", "can I ask something") — gets invited to ask, rather than
    // the generic fallback, since nothing has actually been asked yet.
    id: 'askingHelp',
    variants: {
      es: ['tengo una duda', 'una consulta', 'necesito ayuda', 'tengo una pregunta', 'puedo preguntar', 'tengo una consulta', 'quería preguntar', 'quiero preguntar algo', 'otra pregunta', 'tengo otra pregunta', 'una pregunta más', 'otra cosa', 'una cosa más', 'una duda más'],
      en: ['i have a question', 'a query', 'i need help', 'i have a query', 'can i ask something', 'can i ask you something', 'quick question', 'another question', 'i have another question', 'one more question', 'a question'],
      fr: ["j'ai une question", 'une question', "j'ai besoin d'aide", 'puis-je vous demander quelque chose', "j'aurais une question", 'une petite question', 'une autre question', "j'ai une autre question", 'encore une question'],
      ca: ['tinc un dubte', 'una consulta', 'necessito ajuda', 'tinc una pregunta', 'puc preguntar', 'tinc una consulta', 'volia preguntar', 'una altra pregunta', 'tinc una altra pregunta', 'una pregunta més'],
      de: ['ich habe eine frage', 'eine frage', 'ich brauche hilfe', 'darf ich etwas fragen', 'ich hätte eine frage', 'kurze frage', 'noch eine frage', 'eine weitere frage', 'ich habe noch eine frage'],
      it: ['ho un dubbio', 'una domanda', 'ho bisogno di aiuto', 'ho una domanda', 'posso chiedere', 'avrei una domanda', "un'altra domanda", "ho un'altra domanda", 'ancora una domanda'],
    },
    answer: {
      es: '¡Por supuesto! Dígame qué necesita saber y le informo encantado. Puede preguntarme sobre horarios, servicios, mascotas, parking o cómo reservar.',
      en: "Of course! Please tell me what you'd like to know and I'll be glad to help — you can ask about hours, services, pets, parking or how to book.",
      fr: 'Bien sûr ! Dites-moi ce que vous souhaitez savoir, je serai ravi de vous renseigner — horaires, services, animaux, parking ou modalités de réservation.',
      ca: 'És clar! Digui\'m què necessita saber i l\'informo de seguida. Em pot preguntar sobre horaris, serveis, mascotes, pàrquing o com reservar.',
      de: 'Aber natürlich! Sagen Sie mir, was Sie wissen möchten, ich helfe Ihnen gerne weiter — etwa zu Öffnungszeiten, Services, Haustieren, Parkplatz oder zur Buchung.',
      it: 'Certamente! Mi dica pure cosa desidera sapere, sarò lieto di aiutarla — può chiedermi degli orari, dei servizi, degli animali, del parcheggio o di come prenotare.',
    },
  },
  {
    // Someone expressing they want to book (not just asking the price) gets
    // pointed straight to the booking button instead of the generic fallback.
    id: 'bookingIntent',
    variants: {
      es: ['quiero reservar', 'quiero hacer una reserva', 'cómo reservo', 'cómo puedo reservar', 'quiero una habitación', 'reservar habitación', 'me gustaría reservar', 'necesito reservar', 'deseo reservar', 'hay disponibilidad', 'tienen disponibilidad', 'hay disponibilidad para mañana', 'hay habitaciones libres', 'tienen habitaciones libres', 'queda alguna habitación', 'tienen alguna habitación libre'],
      en: ['i want to book', 'i want to make a reservation', 'how do i book', 'how can i book', 'i want a room', 'book a room', 'i would like to book', 'i need to book', 'is there availability', 'do you have availability', 'any rooms available', 'is there a room available', 'do you have any free rooms'],
      fr: ['je veux réserver', 'je voudrais réserver', 'comment réserver', 'comment puis-je réserver', 'je veux une chambre', 'réserver une chambre', 'y a-t-il de la disponibilité', 'avez-vous de la disponibilité', 'avez-vous une chambre disponible', 'reste-t-il une chambre'],
      ca: ['vull reservar', 'vull fer una reserva', 'com reservo', 'com puc reservar', 'vull una habitació', 'reservar habitació', 'hi ha disponibilitat', 'tenen disponibilitat', 'queda alguna habitació lliure'],
      de: ['ich möchte buchen', 'ich möchte reservieren', 'wie kann ich buchen', 'ich möchte ein zimmer', 'zimmer buchen', 'ich möchte eine reservierung vornehmen', 'gibt es verfügbarkeit', 'haben sie verfügbarkeit', 'ist noch ein zimmer frei', 'haben sie freie zimmer'],
      it: ['voglio prenotare', 'vorrei prenotare', 'come prenoto', 'come posso prenotare', 'voglio una camera', 'prenotare una camera', "c'è disponibilità", 'avete disponibilità', "c'è una camera libera", 'avete camere libere'],
    },
    answer: {
      es: '¡Perfecto! Puede reservar directamente utilizando el botón "Reservar ahora" en la parte superior de esta web, donde verá la disponibilidad y los precios actualizados en tiempo real.',
      en: 'Great! You can book directly using the "Book now" button at the top of this website, where you\'ll see live availability and up-to-date prices.',
      fr: 'Parfait ! Vous pouvez réserver directement en utilisant le bouton « Réserver » en haut de ce site, où vous verrez la disponibilité et les prix actualisés en temps réel.',
      ca: 'Perfecte! Pot reservar directament utilitzant el botó "Reserva ara" a la part superior d\'aquesta web, on veurà la disponibilitat i els preus actualitzats en temps real.',
      de: 'Sehr gerne! Sie können direkt über den Button „Jetzt buchen" oben auf dieser Website buchen, wo Sie die aktuelle Verfügbarkeit und die Preise in Echtzeit sehen.',
      it: 'Perfetto! Può prenotare direttamente utilizzando il pulsante "Prenota ora" in cima a questo sito, dove vedrà la disponibilità e i prezzi aggiornati in tempo reale.',
    },
  },
  {
    id: 'checkIn',
    variants: {
      es: ['check-in', 'checkin', 'hora de entrada', 'a qué hora puedo llegar', 'a qué hora es la entrada', 'cuándo puedo hacer el check-in', 'horario de llegada'],
      en: ['check-in', 'checkin', 'check in time', 'what time can i arrive', 'what time is check-in', 'arrival time'],
      fr: ['check-in', 'heure d\'arrivée', 'à quelle heure puis-je arriver', 'horaire d\'arrivée'],
      ca: ['check-in', 'hora d\'entrada', 'a quina hora puc arribar', 'horari d\'arribada'],
      de: ['check-in', 'anreisezeit', 'wann kann ich einchecken', 'ankunftszeit'],
      it: ['check-in', 'orario di arrivo', 'a che ora posso arrivare', 'orario check-in'],
    },
    answer: {
      es: 'El check-in (entrada) es de 16:30 a 23:30 h.',
      en: 'Check-in is from 4:30 PM to 11:30 PM.',
      fr: 'L\'arrivée (check-in) se fait de 16h30 à 23h30.',
      ca: 'El check-in (entrada) és de 16:30 a 23:30 h.',
      de: 'Der Check-in ist von 16:30 bis 23:30 Uhr möglich.',
      it: 'Il check-in è dalle 16:30 alle 23:30.',
    },
  },
  {
    id: 'checkOut',
    variants: {
      es: ['check-out', 'checkout', 'hora de salida', 'a qué hora tengo que dejar la habitación', 'a qué hora es la salida', 'horario de salida'],
      en: ['check-out', 'checkout', 'check out time', 'what time do i have to leave', 'departure time'],
      fr: ['check-out', 'heure de départ', 'à quelle heure dois-je partir', 'horaire de départ'],
      ca: ['check-out', 'hora de sortida', 'a quina hora he de marxar', 'horari de sortida'],
      de: ['check-out', 'abreisezeit', 'wann muss ich auschecken', 'abreise'],
      it: ['check-out', 'orario di partenza', 'a che ora devo lasciare la camera', 'orario check-out'],
    },
    answer: {
      es: 'El check-out (salida) es de 07:00 a 11:00 h.',
      en: 'Check-out is from 7:00 AM to 11:00 AM.',
      fr: 'Le départ (check-out) se fait de 7h00 à 11h00.',
      ca: 'El check-out (sortida) és de 07:00 a 11:00 h.',
      de: 'Der Check-out ist von 7:00 bis 11:00 Uhr.',
      it: 'Il check-out è dalle 7:00 alle 11:00.',
    },
  },
  {
    // A guest asking what to do if they'll arrive outside reception hours —
    // there's no self-service answer for this (it depends on the day/staff
    // availability), so the right answer is to point them to a real person.
    id: 'lateArrival',
    variants: {
      es: ['si llegamos más tarde', 'y si llego más tarde', 'llego más tarde', 'llegada tardía', 'qué hacemos si llegamos tarde', 'puedo llegar fuera de horario', 'llegamos fuera de horario', 'llego fuera de horario', 'y si llegamos después'],
      en: ['what if we arrive later', 'what if i arrive late', 'arriving late', 'late arrival', 'what do we do if we arrive later', 'can i arrive outside reception hours', 'arriving after hours'],
      fr: ['et si on arrive plus tard', 'que faire si on arrive plus tard', 'arrivée tardive', "arriver en dehors des horaires"],
      ca: ['i si arribem més tard', 'què fem si arribem tard', 'arribada tardana', "arribar fora d'horari"],
      de: ['was ist wenn wir später ankommen', 'was tun wir wenn wir später ankommen', 'späte anreise', 'außerhalb der rezeptionszeiten ankommen'],
      it: ['e se arriviamo più tardi', 'cosa facciamo se arriviamo più tardi', 'arrivo tardivo', 'arrivare fuori orario'],
    },
    answer: {
      es: 'Si prevé llegar fuera del horario de recepción, póngase en contacto con nosotros con antelación al {{phone}} o {{email}} para comentarlo y coordinar su llegada.',
      en: 'If you expect to arrive outside reception hours, please contact us in advance at {{phone}} or {{email}} so we can discuss it and arrange your arrival.',
      fr: "Si vous prévoyez d'arriver en dehors des horaires de réception, merci de nous contacter à l'avance au {{phone}} ou à {{email}} afin d'en discuter et d'organiser votre arrivée.",
      ca: "Si preveu arribar fora de l'horari de recepció, poseu-vos en contacte amb nosaltres amb antelació al {{phone}} o {{email}} per comentar-ho i coordinar la seva arribada.",
      de: 'Wenn Sie außerhalb der Rezeptionszeiten anreisen möchten, kontaktieren Sie uns bitte vorab unter {{phone}} oder {{email}}, damit wir das besprechen und Ihre Ankunft koordinieren können.',
      it: "Se prevede di arrivare fuori dall'orario di reception, la preghiamo di contattarci in anticipo al {{phone}} o {{email}} per parlarne e organizzare il suo arrivo.",
    },
  },
  {
    id: 'pets',
    variants: {
      es: ['mascotas', 'perros', 'gatos', 'admiten mascotas', 'puedo llevar mi perro', 'se permiten animales', 'animales de compañía'],
      en: ['pets', 'dogs', 'cats', 'pet friendly', 'can i bring my dog', 'are pets allowed'],
      fr: ['animaux', 'chiens', 'chats', 'animaux acceptés', 'puis-je amener mon chien'],
      ca: ['mascotes', 'gossos', 'gats', 'admeten mascotes', 'puc portar el meu gos'],
      de: ['haustiere', 'hunde', 'katzen', 'sind haustiere erlaubt', 'kann ich meinen hund mitbringen'],
      it: ['animali', 'cani', 'gatti', 'animali ammessi', 'posso portare il mio cane'],
    },
    answer: {
      es: 'Lo sentimos, el hotel no admite mascotas.',
      en: "We're sorry, but pets are not allowed at the hotel.",
      fr: "Nous sommes désolés, les animaux ne sont pas admis à l'hôtel.",
      ca: 'Ho sentim, l\'hotel no admet mascotes.',
      de: 'Es tut uns leid, aber Haustiere sind im Hotel nicht erlaubt.',
      it: "Siamo spiacenti, ma l'hotel non ammette animali.",
    },
  },
  {
    id: 'smoking',
    variants: {
      es: ['fumar', 'se puede fumar', 'habitaciones para fumadores', 'zona de fumadores'],
      en: ['smoking', 'can i smoke', 'smoking rooms', 'smoking area'],
      fr: ['fumer', 'peut-on fumer', 'chambres fumeurs', 'zone fumeurs'],
      ca: ['fumar', 'es pot fumar', 'habitacions per a fumadors'],
      de: ['rauchen', 'darf ich rauchen', 'raucherzimmer'],
      it: ['fumare', 'si può fumare', 'camere per fumatori'],
    },
    answer: {
      es: 'El hotel es un establecimiento 100% libre de humo, no se permite fumar en ninguna zona.',
      en: 'The hotel is a 100% smoke-free property — smoking is not allowed anywhere on site.',
      fr: "L'hôtel est un établissement 100% non-fumeurs — il est interdit de fumer partout dans l'établissement.",
      ca: 'L\'hotel és un establiment 100% lliure de fum, no es permet fumar en cap zona.',
      de: 'Das Hotel ist zu 100% rauchfrei — Rauchen ist im gesamten Haus nicht gestattet.',
      it: "L'hotel è una struttura 100% non fumatori: non è consentito fumare in nessuna area.",
    },
  },
  {
    id: 'parking',
    variants: {
      es: ['parking', 'aparcamiento', 'dónde puedo aparcar', 'garaje', 'hay parking', 'donde aparco', 'donde aparco el coche', 'puedo aparcar', 'sitio para aparcar', 'aparcar el coche'],
      en: ['parking', 'where can i park', 'garage', 'is there parking', 'where do i park my car', 'car park'],
      fr: ['parking', 'où puis-je me garer', 'garage', 'y a-t-il un parking', 'où garer ma voiture'],
      ca: ['pàrquing', 'aparcament', 'on puc aparcar', 'garatge', 'on aparco el cotxe'],
      de: ['parkplatz', 'parken', 'wo kann ich parken', 'garage', 'gibt es einen parkplatz', 'wo parke ich mein auto'],
      it: ['parcheggio', 'dove posso parcheggiare', 'garage', "c'è un parcheggio"],
    },
    answer: {
      es: 'El hotel no dispone de parking propio. El parking de pago más cercano es Ok Parking, a unos 3 minutos andando del hotel.',
      en: 'The hotel does not have its own parking. The nearest paid car park is Ok Parking, about a 3-minute walk from the hotel.',
      fr: "L'hôtel ne dispose pas de parking privé. Le parking payant le plus proche est Ok Parking, à environ 3 minutes à pied de l'hôtel.",
      ca: "L'hotel no disposa de pàrquing propi. El pàrquing de pagament més proper és Ok Parking, a uns 3 minuts a peu de l'hotel.",
      de: 'Das Hotel verfügt über keinen eigenen Parkplatz. Der nächstgelegene kostenpflichtige Parkplatz ist Ok Parking, etwa 3 Gehminuten vom Hotel entfernt.',
      it: 'L\'hotel non dispone di parcheggio privato. Il parcheggio a pagamento più vicino è Ok Parking, a circa 3 minuti a piedi dall\'hotel.',
    },
  },
  {
    id: 'wifi',
    variants: {
      es: ['wifi', 'internet', 'hay wifi', 'conexión a internet', 'wifi gratis'],
      en: ['wifi', 'internet', 'is there wifi', 'internet connection', 'free wifi'],
      fr: ['wifi', 'internet', "y a-t-il du wifi", 'connexion internet'],
      ca: ['wifi', 'internet', 'hi ha wifi', 'connexió a internet'],
      de: ['wifi', 'wlan', 'internet', 'gibt es wlan', 'internetverbindung'],
      it: ['wifi', 'internet', "c'è il wifi", 'connessione internet'],
    },
    answer: {
      es: 'Sí, el hotel ofrece Wi-Fi gratuita de alta velocidad en todo el establecimiento.',
      en: 'Yes, the hotel offers free high-speed Wi-Fi throughout the property.',
      fr: "Oui, l'hôtel propose le Wi-Fi gratuit haut débit dans tout l'établissement.",
      ca: 'Sí, l\'hotel ofereix Wi-Fi gratuïta d\'alta velocitat a tot l\'establiment.',
      de: 'Ja, das Hotel bietet kostenloses Highspeed-WLAN im gesamten Haus.',
      it: "Sì, l'hotel offre Wi-Fi gratuito ad alta velocità in tutta la struttura.",
    },
  },
  {
    id: 'breakfast',
    variants: {
      es: ['desayuno', 'hay desayuno', 'sirven desayuno', 'incluye desayuno', 'restauración', 'servicio de comida', 'hay comida', 'sirven comidas', 'hay restaurante', 'máquina expendedora', 'vending', 'máquina de café', 'hay café', 'dónde puedo comprar algo de comer'],
      en: ['breakfast', 'is breakfast included', 'do you serve breakfast', 'catering', 'food service', 'is there a restaurant', 'vending machine', 'snack machine', 'coffee machine', 'where can i buy something to eat'],
      fr: ['petit-déjeuner', 'le petit-déjeuner est-il inclus', 'servez-vous le petit-déjeuner', 'restauration', 'y a-t-il un restaurant', 'distributeur automatique', 'machine à café'],
      ca: ['esmorzar', 'hi ha esmorzar', 'inclou esmorzar', 'restauració', 'servei d\'àpats', 'hi ha restaurant', 'màquina expenedora', 'màquina de cafè'],
      de: ['frühstück', 'ist frühstück inbegriffen', 'gibt es frühstück', 'verpflegung', 'gibt es ein restaurant', 'verkaufsautomat', 'kaffeeautomat'],
      it: ['colazione', 'è inclusa la colazione', 'servite la colazione', 'ristorazione', "c'è un ristorante", 'distributore automatico', 'macchina del caffè'],
    },
    answer: {
      es: 'El hotel no ofrece servicio de comidas, desayuno ni restauración; no dispone de restaurante ni cafetería. Sí contamos con una máquina expendedora de comida y café.',
      en: 'The hotel does not offer food service, breakfast or catering — there is no restaurant or café on site. There is a vending machine with food and coffee.',
      fr: "L'hôtel ne propose pas de service de restauration, de petit-déjeuner ni de repas ; il n'y a ni restaurant ni cafétéria sur place. Nous disposons toutefois d'un distributeur automatique de nourriture et de café.",
      ca: 'L\'hotel no ofereix servei d\'àpats, esmorzar ni restauració; no disposa de restaurant ni cafeteria. Sí que comptem amb una màquina expenedora de menjar i cafè.',
      de: 'Das Hotel bietet keinen Verpflegungsservice, kein Frühstück und keine Restauration an — es gibt weder Restaurant noch Café im Haus. Es steht jedoch ein Verkaufsautomat mit Snacks und Kaffee zur Verfügung.',
      it: 'L\'hotel non offre servizio di ristorazione, colazione né pasti; non dispone di ristorante né di bar. È disponibile però un distributore automatico di cibo e caffè.',
    },
  },
  {
    id: 'pool',
    variants: {
      es: ['piscina', 'hay piscina'],
      en: ['pool', 'swimming pool', 'is there a pool'],
      fr: ['piscine', 'y a-t-il une piscine'],
      ca: ['piscina', 'hi ha piscina'],
      de: ['pool', 'schwimmbad', 'gibt es einen pool'],
      it: ['piscina', "c'è la piscina"],
    },
    answer: {
      es: 'El hotel no dispone de piscina, aunque está a solo unos minutos andando de la playa de Lloret de Mar.',
      en: 'The hotel does not have a swimming pool, though it is only a short walk from Lloret de Mar\'s beach.',
      fr: "L'hôtel ne dispose pas de piscine, mais se trouve à quelques minutes à pied de la plage de Lloret de Mar.",
      ca: "L'hotel no disposa de piscina, tot i que és a pocs minuts a peu de la platja de Lloret de Mar.",
      de: 'Das Hotel verfügt über keinen Pool, liegt aber nur wenige Gehminuten vom Strand von Lloret de Mar entfernt.',
      it: 'L\'hotel non dispone di piscina, anche se si trova a pochi minuti a piedi dalla spiaggia di Lloret de Mar.',
    },
  },
  {
    id: 'cancellation',
    variants: {
      es: ['cancelación', 'puedo cancelar', 'política de cancelación', 'cancelar reserva', 'devolución'],
      en: ['cancellation', 'can i cancel', 'cancellation policy', 'cancel my booking', 'refund'],
      fr: ['annulation', 'puis-je annuler', "politique d'annulation", 'annuler ma réservation', 'remboursement'],
      ca: ['cancel·lació', 'puc cancel·lar', 'política de cancel·lació', 'cancel·lar reserva'],
      de: ['stornierung', 'kann ich stornieren', 'stornierungsbedingungen', 'buchung stornieren'],
      it: ['cancellazione', 'posso cancellare', 'politica di cancellazione', 'cancellare la prenotazione'],
    },
    answer: {
      es: 'Depende de la tarifa reservada: con tarifa de cancelación gratuita puede cancelar sin coste hasta 24 horas antes de la llegada; con tarifa no reembolsable no se admiten cancelaciones. Consulte las condiciones exactas de su reserva.',
      en: "It depends on the rate you booked: with a free-cancellation rate you can cancel at no cost up to 24 hours before arrival; with a non-refundable rate, cancellations aren't accepted. Please check your booking's exact terms.",
      fr: "Cela dépend du tarif réservé : avec un tarif à annulation gratuite, vous pouvez annuler sans frais jusqu'à 24 heures avant l'arrivée ; avec un tarif non remboursable, les annulations ne sont pas acceptées. Consultez les conditions exactes de votre réservation.",
      ca: 'Depèn de la tarifa reservada: amb tarifa de cancel·lació gratuïta pot cancel·lar sense cost fins a 24 hores abans de l\'arribada; amb tarifa no reemborsable no s\'admeten cancel·lacions. Consulti les condicions exactes de la seva reserva.',
      de: 'Das hängt vom gebuchten Tarif ab: Bei einem Tarif mit kostenloser Stornierung können Sie bis 24 Stunden vor der Anreise kostenlos stornieren; bei einem nicht erstattungsfähigen Tarif sind Stornierungen nicht möglich. Bitte prüfen Sie die genauen Bedingungen Ihrer Buchung.',
      it: "Dipende dalla tariffa prenotata: con una tariffa a cancellazione gratuita può cancellare senza costi fino a 24 ore prima dell'arrivo; con una tariffa non rimborsabile non sono ammesse cancellazioni. Verifichi le condizioni esatte della sua prenotazione.",
    },
  },
  {
    id: 'address',
    variants: {
      es: ['dirección', 'dónde está el hotel', 'cómo llego', 'cómo llegar', 'ubicación'],
      en: ['address', 'where is the hotel', 'how do i get there', 'how to get there', 'location'],
      fr: ['adresse', 'où se trouve l\'hôtel', 'comment y aller', 'emplacement'],
      ca: ['adreça', 'on és l\'hotel', 'com hi arribo', 'com arribar-hi', 'ubicació'],
      de: ['adresse', 'wo ist das hotel', 'wie komme ich dorthin', 'lage'],
      it: ["indirizzo", "dove si trova l'hotel", "come arrivare", "posizione"],
    },
    answer: {
      es: 'Estamos en {{address}}, en la calle peatonal principal de tiendas. La playa está a 3 minutos andando, la zona de discotecas a 5 minutos y la estación de autobuses también a unos 5 minutos a pie.',
      en: "We're at {{address}}, on the main pedestrian shopping street. The beach is a 3-minute walk away, the nightclub area is 5 minutes, and the bus station is also about a 5-minute walk.",
      fr: "Nous sommes situés {{address}}, dans la principale rue piétonne commerçante. La plage est à 3 minutes à pied, le quartier des discothèques à 5 minutes, et la gare routière également à environ 5 minutes à pied.",
      ca: 'Som a {{address}}, al carrer principal per a vianants de botigues. La platja és a 3 minuts a peu, la zona de discoteques a 5 minuts, i l\'estació d\'autobusos també a uns 5 minuts a peu.',
      de: 'Wir befinden uns in {{address}}, in der zentralen Fußgängerzone mit Geschäften. Der Strand ist 3 Gehminuten entfernt, das Diskothekenviertel 5 Minuten, und der Busbahnhof ebenfalls etwa 5 Gehminuten.',
      it: 'Ci troviamo in {{address}}, sulla via pedonale principale dello shopping. La spiaggia è a 3 minuti a piedi, la zona delle discoteche a 5 minuti, e anche la stazione degli autobus è a circa 5 minuti a piedi.',
    },
  },
  {
    id: 'contactPhone',
    variants: {
      es: ['teléfono', 'número de teléfono', 'cómo os contacto', 'contactar recepción', 'email', 'correo'],
      en: ['phone', 'phone number', 'how do i contact you', 'contact reception', 'email'],
      fr: ['téléphone', 'numéro de téléphone', 'comment vous contacter', 'contacter la réception', 'e-mail'],
      ca: ['telèfon', 'número de telèfon', 'com us contacto', 'contactar recepció', 'correu'],
      de: ['telefon', 'telefonnummer', 'wie kann ich sie kontaktieren', 'rezeption kontaktieren', 'e-mail'],
      it: ['telefono', 'numero di telefono', 'come vi contatto', 'contattare la reception', 'email'],
    },
    answer: {
      es: 'Puede llamarnos al {{phone}} o escribirnos a {{email}}.',
      en: 'You can call us at {{phone}} or email us at {{email}}.',
      fr: 'Vous pouvez nous appeler au {{phone}} ou nous écrire à {{email}}.',
      ca: 'Ens pot trucar al {{phone}} o escriure\'ns a {{email}}.',
      de: 'Sie erreichen uns telefonisch unter {{phone}} oder per E-Mail an {{email}}.',
      it: 'Può chiamarci al {{phone}} o scriverci a {{email}}.',
    },
  },
  {
    id: 'paymentCards',
    variants: {
      es: ['tarjeta', 'formas de pago', 'qué tarjetas aceptáis', 'métodos de pago', 'pago'],
      en: ['card', 'payment methods', 'what cards do you accept', 'how can i pay'],
      fr: ['carte', 'moyens de paiement', 'quelles cartes acceptez-vous', 'comment payer'],
      ca: ['targeta', 'formes de pagament', 'quines targetes accepteu'],
      de: ['karte', 'zahlungsmethoden', 'welche karten akzeptieren sie', 'wie kann ich bezahlen'],
      it: ['carta', 'metodi di pagamento', 'quali carte accettate', 'come posso pagare'],
    },
    answer: {
      es: 'Aceptamos Visa, MasterCard y Carte Bleue.',
      en: 'We accept Visa, MasterCard and Carte Bleue.',
      fr: 'Nous acceptons Visa, MasterCard et Carte Bleue.',
      ca: 'Acceptem Visa, MasterCard i Carte Bleue.',
      de: 'Wir akzeptieren Visa, MasterCard und Carte Bleue.',
      it: 'Accettiamo Visa, MasterCard e Carte Bleue.',
    },
  },
  {
    id: 'roomTypes',
    variants: {
      es: ['tipos de habitación', 'qué habitaciones tenéis', 'cuántas habitaciones', 'habitaciones disponibles'],
      en: ['room types', 'what rooms do you have', 'how many rooms', 'available rooms'],
      fr: ['types de chambres', 'quelles chambres avez-vous', 'combien de chambres'],
      ca: ['tipus d\'habitació', 'quines habitacions teniu', 'quantes habitacions'],
      de: ['zimmertypen', 'welche zimmer haben sie', 'wie viele zimmer'],
      it: ['tipi di camera', 'quali camere avete', 'quante camere'],
    },
    answer: {
      es: 'Tenemos 40 habitaciones: Individual, Twin con Ventana, Twin con Balcón, Triple, Cuádruple y un Apartamento Ático. Puede verlas todas en la sección de Habitaciones.',
      en: 'We have 40 rooms: Single, Twin with Window, Twin with Balcony, Triple, Quadruple and a Penthouse Apartment. You can see them all in the Rooms section.',
      fr: 'Nous avons 40 chambres : Simple, Twin avec Fenêtre, Twin avec Balcon, Triple, Quadruple et un Appartement Penthouse. Vous pouvez toutes les voir dans la section Chambres.',
      ca: 'Tenim 40 habitacions: Individual, Twin amb Finestra, Twin amb Balcó, Triple, Quàdruple i un Apartament Àtic. Les pot veure totes a la secció d\'Habitacions.',
      de: 'Wir haben 40 Zimmer: Einzelzimmer, Zweibettzimmer mit Fenster, Zweibettzimmer mit Balkon, Dreibettzimmer, Vierbettzimmer und ein Penthouse-Apartment. Sie finden alle im Bereich Zimmer.',
      it: 'Abbiamo 40 camere: Singola, Twin con Finestra, Twin con Balcone, Tripla, Quadrupla e un Appartamento Attico. Può vederle tutte nella sezione Camere.',
    },
  },
  {
    id: 'roomEquipment',
    variants: {
      es: ['aire acondicionado', 'tiene aire acondicionado', 'nevera', 'minibar', 'hay nevera', 'hay minibar', 'frigorífico', 'hay frigorífico en la habitación'],
      en: ['air conditioning', 'is there air conditioning', 'fridge', 'minibar', 'is there a fridge', 'refrigerator', 'do rooms have a fridge'],
      fr: ['climatisation', 'y a-t-il la climatisation', 'réfrigérateur', 'minibar', 'y a-t-il un frigo'],
      ca: ['aire condicionat', 'té aire condicionat', 'nevera', 'minibar', 'hi ha nevera'],
      de: ['klimaanlage', 'gibt es klimaanlage', 'kühlschrank', 'minibar', 'gibt es einen kühlschrank'],
      it: ['aria condizionata', "c'è l'aria condizionata", 'frigorifero', 'minibar', "c'è il frigo"],
    },
    answer: {
      es: 'Todas las habitaciones disponen de aire acondicionado. Las habitaciones no cuentan con nevera ni minibar.',
      en: 'All rooms are equipped with air conditioning. Rooms do not include a fridge or minibar.',
      fr: "Toutes les chambres disposent de la climatisation. Les chambres ne comprennent ni réfrigérateur ni minibar.",
      ca: 'Totes les habitacions disposen d\'aire condicionat. Les habitacions no disposen de nevera ni minibar.',
      de: 'Alle Zimmer sind mit Klimaanlage ausgestattet. Die Zimmer verfügen weder über einen Kühlschrank noch über eine Minibar.',
      it: 'Tutte le camere dispongono di aria condizionata. Le camere non dispongono di frigorifero né di minibar.',
    },
  },
  {
    id: 'receptionHours',
    variants: {
      es: ['recepción', 'horario de recepción', 'recepción 24 horas', 'hay alguien en recepción de noche', 'a quién pregunto durante mi estancia', 'recepción 24h'],
      en: ['reception', 'reception hours', '24 hour reception', 'is there someone at reception at night', 'who do i ask during my stay'],
      fr: ['réception', 'horaires de la réception', 'réception 24h', "y a-t-il quelqu'un à la réception la nuit"],
      ca: ['recepció', 'horari de recepció', 'recepció 24 hores', 'hi ha algú a recepció de nit'],
      de: ['rezeption', 'öffnungszeiten der rezeption', '24 stunden rezeption', 'ist nachts jemand an der rezeption'],
      it: ['reception', 'orari reception', 'reception 24 ore', "c'è qualcuno in reception di notte"],
    },
    answer: {
      es: 'Durante la temporada de verano, la recepción está disponible las 24 horas del día. Para cualquier necesidad durante su estancia, puede dirigirse directamente a recepción y le atenderemos con mucho gusto.',
      en: "During the summer season, reception is staffed 24 hours a day. For anything you need during your stay, please come directly to reception and we'll be glad to help.",
      fr: "Pendant la saison estivale, la réception est ouverte 24 heures sur 24. Pour tout besoin pendant votre séjour, adressez-vous directement à la réception, nous serons ravis de vous aider.",
      ca: 'Durant la temporada d\'estiu, la recepció està disponible les 24 hores del dia. Per a qualsevol necessitat durant la seva estada, pot adreçar-se directament a recepció i l\'atendrem amb molt de gust.',
      de: 'In der Sommersaison ist die Rezeption rund um die Uhr besetzt. Bei allem, was Sie während Ihres Aufenthalts benötigen, wenden Sie sich bitte direkt an die Rezeption — wir helfen Ihnen gerne weiter.',
      it: 'Durante la stagione estiva, la reception è disponibile 24 ore su 24. Per qualsiasi necessità durante il soggiorno, può rivolgersi direttamente alla reception: saremo lieti di aiutarla.',
    },
  },
  {
    id: 'pricing',
    variants: {
      es: ['precio', 'precios', 'cuánto cuesta', 'cuanto cuesta', 'tarifa', 'tarifas', 'cuánto vale una habitación', 'cuál es el precio', 'precio de la habitación'],
      en: ['price', 'prices', 'how much does it cost', 'rate', 'rates', 'how much is a room', 'what is the price', 'room price'],
      fr: ['prix', 'tarif', 'tarifs', 'combien coûte', 'quel est le prix', 'prix de la chambre'],
      ca: ['preu', 'preus', 'quant costa', 'tarifa', 'tarifes', 'quin és el preu'],
      de: ['preis', 'preise', 'wie viel kostet', 'tarif', 'was kostet ein zimmer'],
      it: ['prezzo', 'prezzi', 'quanto costa', 'tariffa', 'tariffe', 'qual è il prezzo'],
    },
    answer: {
      es: 'Para consultar precios y tipos de habitación, utilice el botón "Reservar ahora" de esta web, donde podrá ver la disponibilidad y las tarifas actualizadas. También puede comparar precios en Booking o Airbnb si lo prefiere.',
      en: 'To check prices and room types, please use the "Book now" button on this website, where you can see availability and up-to-date rates. You\'re also welcome to compare prices on Booking or Airbnb if you prefer.',
      fr: 'Pour consulter les prix et les types de chambres, utilisez le bouton « Réserver » de ce site, où vous pourrez voir la disponibilité et les tarifs actualisés. Vous pouvez également comparer les prix sur Booking ou Airbnb si vous le souhaitez.',
      ca: 'Per consultar preus i tipus d\'habitació, utilitzi el botó "Reserva ara" d\'aquesta web, on podrà veure la disponibilitat i les tarifes actualitzades. També pot comparar preus a Booking o Airbnb si ho prefereix.',
      de: 'Um Preise und Zimmertypen einzusehen, nutzen Sie bitte den Button „Jetzt buchen" auf dieser Website, wo Sie die Verfügbarkeit und die aktuellen Preise sehen können. Sie können die Preise auch gerne auf Booking oder Airbnb vergleichen.',
      it: 'Per consultare prezzi e tipologie di camera, utilizzi il pulsante "Prenota ora" su questo sito, dove potrà vedere la disponibilità e le tariffe aggiornate. Può anche confrontare i prezzi su Booking o Airbnb se preferisce.',
    },
  },
  {
    id: 'activities',
    variants: {
      es: ['excursiones', 'excursión', 'actividades', 'qué hacer', 'qué visitar', 'planes cerca del hotel', 'actividades locales', 'qué ver en lloret', 'recomiendan alguna excursión', 'me recomiendan alguna excursión'],
      en: ['excursions', 'excursion', 'activities', 'what to do', 'what to visit', 'things to do nearby', 'local activities'],
      fr: ['excursions', 'activités', 'que faire', 'que visiter', 'activités locales'],
      ca: ['excursions', 'activitats', 'què fer', 'què visitar', 'activitats locals'],
      de: ['ausflüge', 'aktivitäten', 'was kann man unternehmen', 'was besichtigen', 'lokale aktivitäten'],
      it: ['escursioni', 'attività', 'cosa fare', 'cosa visitare', 'attività locali'],
    },
    answer: {
      es: 'Para excursiones o actividades en la zona, le recomendamos contactar con recepción o consultar la agenda local de eventos en lloretdemar.org/agenda.',
      en: 'For excursions or local activities, we recommend contacting reception or checking the local events agenda at lloretdemar.org/agenda.',
      fr: "Pour les excursions ou les activités locales, nous vous recommandons de contacter la réception ou de consulter l'agenda local des événements sur lloretdemar.org/agenda.",
      ca: 'Per a excursions o activitats a la zona, li recomanem contactar amb recepció o consultar l\'agenda local d\'esdeveniments a lloretdemar.org/agenda.',
      de: 'Für Ausflüge oder Aktivitäten in der Umgebung empfehlen wir Ihnen, sich an die Rezeption zu wenden oder den lokalen Veranstaltungskalender unter lloretdemar.org/agenda zu besuchen.',
      it: "Per escursioni o attività nella zona, le consigliamo di contattare la reception o di consultare l'agenda locale degli eventi su lloretdemar.org/agenda.",
    },
  },
]
