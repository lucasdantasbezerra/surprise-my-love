import { Lang } from "./translations";

export interface UiDict {
  hero: {
    couplesCount: string; // "+2.000 casais"
    guarantee: string;
    sideWhatsapp: string;
    sideOurSong: string;
    sideSongSubtitle: string;
    sideSongTitle: string;
  };
  steps: {
    shareTitle: string;
    shareDesc: string;
  };
  benefits: {
    kicker: string;
    title: string;
    titleEm: string;
    sub: string;
    items: { title: string; desc: string }[];
  };
  testimonials: {
    kicker: string;
    title: string;
    titleEm: string;
    stats: string;
  };
  creator: {
    placeholderTitle: string;
    placeholderHonoree: string;
    placeholderMessage: string;
    placeholderFinal: string;
    placeholderMusic: string;
    placeholderSlug: string;
    saveDraft: string;
    photoLimitWarn: (n: number, plan: string) => string;
    needLogin: string;
    published: string;
    drafted: string;
    saveError: string;
  };
  miniSite: {
    ourSong: string;
  };
  defaults: {
    title: string;
    honoree: string;
    message: string;
    finalMessage: string;
    music: string;
  };
  view: {
    notFoundTitle: string;
    notFoundSub: string;
    ourStory: string;
    issuePrefix: string; // "VOL." or equivalent
    issueNo: string;
    edition: string;
    chapters: string;
    aLoveStory: string;
    dedicatedTo: string;
    chapter1: string;
    chapter2: string;
    chapter3: string;
    chapter4: string;
    continueLabel: string;
    end: string;
    madeWithLove: string;
    memory: string;
    figCover: string;
    share: string;
    linkCopied: string;
    youAndMe: string;
  };
}

const en: UiDict = {
  hero: {
    couplesCount: "+2,000 couples",
    guarantee: "7-day guarantee",
    sideWhatsapp: "WhatsApp",
    sideOurSong: "Our song",
    sideSongSubtitle: "Message, photos and music inside the mini-site.",
    sideSongTitle: "Perfect — Ed Sheeran",
  },
  steps: {
    shareTitle: "Share and amaze",
    shareDesc: "Send the link on WhatsApp or print the QR Code for an unforgettable surprise.",
  },
  benefits: {
    kicker: "Why My Love Page",
    title: "Made for those who",
    titleEm: "truly love.",
    sub: "Every detail is crafted to turn a simple surprise into an eternal memory.",
    items: [
      { title: "Ready in 3 minutes", desc: "Customize, pay and get the link instantly. No waiting." },
      { title: "Yours forever", desc: "Premium plan is lifetime. Edit as much as you want, no fees." },
      { title: "Personalized QR Code", desc: "Print it, frame it, gift it. Ready to move hearts." },
      { title: "Soundtrack of love", desc: "Music playing right on the page via Spotify or YouTube." },
      { title: "Beautiful on any screen", desc: "Phone, tablet or desktop — flawless experience." },
      { title: "7-day guarantee", desc: "Didn't love it? Full refund. No questions asked." },
      { title: "Share with the world", desc: "Short link, easy to send on WhatsApp, Instagram or email." },
      { title: "Tiny moving details", desc: "Subtle animations, real-time counter, editorial type." },
    ],
  },
  testimonials: {
    kicker: "Real stories",
    title: "Those who tried,",
    titleEm: "got emotional.",
    stats: "4.9/5 · +2,000 couples surprised",
  },
  creator: {
    placeholderTitle: "Mary & John",
    placeholderHonoree: "Mary",
    placeholderMessage: "I've loved you since the very first second...",
    placeholderFinal: "Forever yours",
    placeholderMusic: "Perfect — Ed Sheeran",
    placeholderSlug: "mary-and-john",
    saveDraft: "Save draft",
    photoLimitWarn: (n, plan) => `Limit of ${n} photos for the ${plan} plan`,
    needLogin: "Sign in to save your page",
    published: "Page published!",
    drafted: "Draft saved",
    saveError: "Error while saving",
  },
  miniSite: { ourSong: "♪ Our song" },
  defaults: {
    title: "Mary & John",
    honoree: "Mary",
    message: "Every second by your side is a page from my favorite story.",
    finalMessage: "Forever, me",
    music: "Perfect — Ed Sheeran",
  },
  view: {
    notFoundTitle: "Page not found",
    notFoundSub: "This page may have expired or no longer exists.",
    ourStory: "Our story",
    issuePrefix: "VOL.",
    issueNo: "Nº",
    edition: "Edition",
    chapters: "Chapters",
    aLoveStory: "A love story",
    dedicatedTo: "dedicated to",
    chapter1: "The beginning",
    chapter2: "Our moments",
    chapter3: "A letter to you",
    chapter4: "Our soundtrack",
    continueLabel: "continue",
    end: "the end",
    madeWithLove: "made with love at",
    memory: "Memory",
    figCover: "fig. 01 — cover",
    share: "Share",
    linkCopied: "Link copied!",
    youAndMe: "You & Me",
  },
};

const ptBR: UiDict = {
  hero: {
    couplesCount: "+2.000 casais",
    guarantee: "Garantia de 7 dias",
    sideWhatsapp: "WhatsApp",
    sideOurSong: "Nossa música",
    sideSongSubtitle: "Mensagem, fotos e música tocando dentro do minisite.",
    sideSongTitle: "Perfect — Ed Sheeran",
  },
  steps: {
    shareTitle: "Compartilhe e emocione",
    shareDesc: "Mande o link no WhatsApp ou imprima o QR Code para uma surpresa inesquecível.",
  },
  benefits: {
    kicker: "Por que My Love Page",
    title: "Feito para quem ama de",
    titleEm: "verdade.",
    sub: "Cada detalhe foi pensado para transformar uma surpresa simples em uma lembrança eterna.",
    items: [
      { title: "Pronto em 3 minutos", desc: "Personalize, pague e receba o link na hora. Sem espera, sem complicação." },
      { title: "Para sempre seu", desc: "Plano Premium é vitalício. Edite quantas vezes quiser, sem mensalidade." },
      { title: "QR Code personalizado", desc: "Imprima, coloque numa moldura ou caixa de presente. Pronto para emocionar." },
      { title: "Trilha sonora do amor", desc: "Música tocando direto na página com Spotify ou YouTube." },
      { title: "Lindo em qualquer tela", desc: "Celular, tablet ou computador — a experiência é sempre impecável." },
      { title: "Garantia de 7 dias", desc: "Não amou? Devolvemos cada centavo. Sem perguntas, sem burocracia." },
      { title: "Compartilhe com o mundo", desc: "Link curto e fácil de mandar no WhatsApp, Instagram ou e-mail." },
      { title: "Detalhes que emocionam", desc: "Animações sutis, contador em tempo real e tipografia editorial." },
    ],
  },
  testimonials: {
    kicker: "Histórias reais",
    title: "Quem já fez,",
    titleEm: "se emocionou.",
    stats: "4.9/5 · +2.000 casais surpreendidos",
  },
  creator: {
    placeholderTitle: "Maria & João",
    placeholderHonoree: "Maria",
    placeholderMessage: "Te amo desde o primeiro segundo...",
    placeholderFinal: "Para sempre seu(sua)",
    placeholderMusic: "Perfect — Ed Sheeran",
    placeholderSlug: "maria-e-joao",
    saveDraft: "Salvar rascunho",
    photoLimitWarn: (n, plan) => `Limite de ${n} fotos para o plano ${plan}`,
    needLogin: "Faça login para salvar sua página",
    published: "Página publicada!",
    drafted: "Rascunho salvo",
    saveError: "Erro ao salvar",
  },
  miniSite: { ourSong: "♪ Nossa música" },
  defaults: {
    title: "Maria & João",
    honoree: "Maria",
    message: "Cada segundo ao seu lado é uma página da minha história favorita.",
    finalMessage: "Para sempre, eu",
    music: "Perfect — Ed Sheeran",
  },
  view: {
    notFoundTitle: "Página não encontrada",
    notFoundSub: "Esta página pode ter expirado ou não existe mais.",
    ourStory: "Nossa história",
    issuePrefix: "VOL.",
    issueNo: "Nº",
    edition: "Edição",
    chapters: "Capítulos",
    aLoveStory: "Uma história de amor",
    dedicatedTo: "dedicado a",
    chapter1: "O começo",
    chapter2: "Nossos momentos",
    chapter3: "Carta para você",
    chapter4: "Nossa trilha",
    continueLabel: "continuar",
    end: "fim",
    madeWithLove: "feito com amor em",
    memory: "Memória",
    figCover: "fig. 01 — capa",
    share: "Compartilhar",
    linkCopied: "Link copiado!",
    youAndMe: "Eu & Você",
  },
};

const es: UiDict = {
  ...en,
  hero: { ...en.hero, couplesCount: "+2.000 parejas", guarantee: "Garantía de 7 días", sideOurSong: "Nuestra canción", sideSongSubtitle: "Mensaje, fotos y música dentro del mini-sitio." },
  steps: { shareTitle: "Comparte y emociona", shareDesc: "Envía el enlace por WhatsApp o imprime el QR para una sorpresa inolvidable." },
  benefits: {
    kicker: "Por qué My Love Page",
    title: "Hecho para quien ama",
    titleEm: "de verdad.",
    sub: "Cada detalle convierte una sorpresa simple en un recuerdo eterno.",
    items: [
      { title: "Listo en 3 minutos", desc: "Personaliza, paga y recibe el enlace al instante." },
      { title: "Tuyo para siempre", desc: "Premium es de por vida. Edita sin límites, sin mensualidades." },
      { title: "QR personalizado", desc: "Imprime, enmarca, regala. Listo para emocionar." },
      { title: "Banda sonora del amor", desc: "Música directamente en la página vía Spotify o YouTube." },
      { title: "Hermoso en cualquier pantalla", desc: "Móvil, tablet o PC — experiencia impecable." },
      { title: "Garantía de 7 días", desc: "¿No te encantó? Te devolvemos todo. Sin preguntas." },
      { title: "Compártelo con el mundo", desc: "Enlace corto, fácil de enviar por WhatsApp o Instagram." },
      { title: "Detalles que emocionan", desc: "Animaciones sutiles, contador en vivo, tipografía editorial." },
    ],
  },
  testimonials: { kicker: "Historias reales", title: "Quien lo hizo,", titleEm: "se emocionó.", stats: "4.9/5 · +2.000 parejas sorprendidas" },
  creator: {
    ...en.creator,
    placeholderTitle: "María & Juan", placeholderHonoree: "María",
    placeholderMessage: "Te amo desde el primer segundo...", placeholderFinal: "Tuyo(a) para siempre",
    placeholderSlug: "maria-y-juan",
    saveDraft: "Guardar borrador",
    photoLimitWarn: (n, plan) => `Límite de ${n} fotos para el plan ${plan}`,
    needLogin: "Inicia sesión para guardar tu página",
    published: "¡Página publicada!", drafted: "Borrador guardado", saveError: "Error al guardar",
  },
  miniSite: { ourSong: "♪ Nuestra canción" },
  defaults: {
    title: "María & Juan", honoree: "María",
    message: "Cada segundo a tu lado es una página de mi historia favorita.",
    finalMessage: "Para siempre, yo", music: "Perfect — Ed Sheeran",
  },
  view: {
    ...en.view,
    notFoundTitle: "Página no encontrada", notFoundSub: "Esta página pudo expirar o ya no existe.",
    ourStory: "Nuestra historia", edition: "Edición", chapters: "Capítulos",
    aLoveStory: "Una historia de amor", dedicatedTo: "dedicado a",
    chapter1: "El comienzo", chapter2: "Nuestros momentos", chapter3: "Carta para ti", chapter4: "Nuestra banda sonora",
    continueLabel: "continuar", end: "fin", madeWithLove: "hecho con amor en",
    memory: "Memoria", figCover: "fig. 01 — portada", share: "Compartir", linkCopied: "¡Enlace copiado!", youAndMe: "Tú & Yo",
  },
};

const fr: UiDict = {
  ...en,
  hero: { ...en.hero, couplesCount: "+2 000 couples", guarantee: "Garantie 7 jours", sideOurSong: "Notre chanson", sideSongSubtitle: "Message, photos et musique dans le mini-site." },
  steps: { shareTitle: "Partagez et émerveillez", shareDesc: "Envoyez le lien par WhatsApp ou imprimez le QR pour une surprise inoubliable." },
  benefits: {
    kicker: "Pourquoi My Love Page", title: "Pour ceux qui aiment", titleEm: "vraiment.",
    sub: "Chaque détail transforme une surprise simple en souvenir éternel.",
    items: [
      { title: "Prêt en 3 minutes", desc: "Personnalisez, payez et recevez le lien immédiatement." },
      { title: "À vous pour toujours", desc: "Premium à vie. Modifiez à volonté, sans abonnement." },
      { title: "QR Code personnalisé", desc: "Imprimez, encadrez, offrez. Prêt à émouvoir." },
      { title: "Bande-son de l'amour", desc: "Musique sur la page via Spotify ou YouTube." },
      { title: "Beau sur tout écran", desc: "Mobile, tablette, ordinateur — expérience impeccable." },
      { title: "Garantie 7 jours", desc: "Pas convaincu ? Remboursement intégral." },
      { title: "Partagez au monde", desc: "Lien court, facile à envoyer." },
      { title: "Détails émouvants", desc: "Animations subtiles, compteur en direct, typographie éditoriale." },
    ],
  },
  testimonials: { kicker: "Histoires vraies", title: "Ceux qui l'ont fait,", titleEm: "ont été émus.", stats: "4.9/5 · +2 000 couples surpris" },
  creator: {
    ...en.creator,
    placeholderTitle: "Marie & Jean", placeholderHonoree: "Marie",
    placeholderMessage: "Je t'aime depuis la première seconde...", placeholderFinal: "Pour toujours à toi",
    placeholderSlug: "marie-et-jean", saveDraft: "Enregistrer brouillon",
    photoLimitWarn: (n, plan) => `Limite de ${n} photos pour le plan ${plan}`,
    needLogin: "Connectez-vous pour enregistrer", published: "Page publiée !", drafted: "Brouillon enregistré", saveError: "Erreur d'enregistrement",
  },
  miniSite: { ourSong: "♪ Notre chanson" },
  defaults: {
    title: "Marie & Jean", honoree: "Marie",
    message: "Chaque seconde près de toi est une page de mon histoire préférée.",
    finalMessage: "Pour toujours, moi", music: "Perfect — Ed Sheeran",
  },
  view: {
    ...en.view,
    notFoundTitle: "Page introuvable", notFoundSub: "Cette page a peut-être expiré.",
    ourStory: "Notre histoire", edition: "Édition", chapters: "Chapitres",
    aLoveStory: "Une histoire d'amour", dedicatedTo: "dédié à",
    chapter1: "Le début", chapter2: "Nos moments", chapter3: "Lettre pour toi", chapter4: "Notre bande-son",
    continueLabel: "continuer", end: "fin", madeWithLove: "fait avec amour sur",
    memory: "Souvenir", figCover: "fig. 01 — couverture", share: "Partager", linkCopied: "Lien copié !", youAndMe: "Toi & Moi",
  },
};

const it: UiDict = {
  ...en,
  hero: { ...en.hero, couplesCount: "+2.000 coppie", guarantee: "Garanzia 7 giorni", sideOurSong: "La nostra canzone", sideSongSubtitle: "Messaggio, foto e musica nel mini-sito." },
  steps: { shareTitle: "Condividi ed emoziona", shareDesc: "Invia il link su WhatsApp o stampa il QR per una sorpresa indimenticabile." },
  benefits: {
    kicker: "Perché My Love Page", title: "Fatto per chi ama", titleEm: "davvero.",
    sub: "Ogni dettaglio trasforma una sorpresa in un ricordo eterno.",
    items: [
      { title: "Pronto in 3 minuti", desc: "Personalizza, paga e ricevi il link subito." },
      { title: "Tuo per sempre", desc: "Premium a vita. Modifica quanto vuoi." },
      { title: "QR personalizzato", desc: "Stampa, incornicia, regala." },
      { title: "Colonna sonora dell'amore", desc: "Musica via Spotify o YouTube." },
      { title: "Bello su ogni schermo", desc: "Telefono, tablet o PC — esperienza impeccabile." },
      { title: "Garanzia 7 giorni", desc: "Non ti è piaciuto? Rimborso totale." },
      { title: "Condividi con il mondo", desc: "Link breve e facile da inviare." },
      { title: "Dettagli che emozionano", desc: "Animazioni sottili, contatore live, tipografia editoriale." },
    ],
  },
  testimonials: { kicker: "Storie vere", title: "Chi l'ha fatto,", titleEm: "si è emozionato.", stats: "4.9/5 · +2.000 coppie sorprese" },
  creator: {
    ...en.creator,
    placeholderTitle: "Maria & Giovanni", placeholderHonoree: "Maria",
    placeholderMessage: "Ti amo dal primo istante...", placeholderFinal: "Tuo(a) per sempre",
    placeholderSlug: "maria-e-giovanni", saveDraft: "Salva bozza",
    photoLimitWarn: (n, plan) => `Limite di ${n} foto per il piano ${plan}`,
    needLogin: "Accedi per salvare", published: "Pagina pubblicata!", drafted: "Bozza salvata", saveError: "Errore nel salvataggio",
  },
  miniSite: { ourSong: "♪ La nostra canzone" },
  defaults: {
    title: "Maria & Giovanni", honoree: "Maria",
    message: "Ogni secondo accanto a te è una pagina della mia storia preferita.",
    finalMessage: "Per sempre, io", music: "Perfect — Ed Sheeran",
  },
  view: {
    ...en.view,
    notFoundTitle: "Pagina non trovata", notFoundSub: "Questa pagina potrebbe essere scaduta.",
    ourStory: "La nostra storia", edition: "Edizione", chapters: "Capitoli",
    aLoveStory: "Una storia d'amore", dedicatedTo: "dedicato a",
    chapter1: "L'inizio", chapter2: "I nostri momenti", chapter3: "Lettera per te", chapter4: "La nostra colonna sonora",
    continueLabel: "continua", end: "fine", madeWithLove: "fatto con amore su",
    memory: "Ricordo", figCover: "fig. 01 — copertina", share: "Condividi", linkCopied: "Link copiato!", youAndMe: "Io & Te",
  },
};

// For other languages, fall back to English (best effort)
export const UI: Record<Lang, UiDict> = {
  "pt-BR": ptBR,
  en,
  es,
  fr,
  it,
  ru: en,
  ja: en,
  zh: en,
  hi: en,
  ar: en,
  id: en,
  bn: en,
  ur: en,
};
