import type { AppLanguageCode } from '@/constants/localization';

export type MaskPathId = 'amore' | 'paura' | 'successo' | 'solitudine' | 'senso' | 'ombra';

export type MaskPath = {
  accent: string;
  description: string;
  id: MaskPathId;
  locked?: boolean;
  questionCount: number;
  signal: string;
  title: string;
};

export const maskPaths: MaskPath[] = [
  {
    accent: '#B4234F',
    description: 'Le domande che parlano di amore, partner, passione e legami che restano.',
    id: 'amore',
    questionCount: 9,
    signal: 'La maschera che cerca conferme.',
    title: 'Amore',
  },
  {
    accent: '#8B2F45',
    description: 'Paure, fallimenti, ferite e verità che non si lasciano guardare subito.',
    id: 'paura',
    questionCount: 10,
    signal: 'La maschera che protegge.',
    title: 'Paura',
  },
  {
    accent: '#A85D16',
    description: 'Soldi, successo, lavoro, ambizione e ciò che pensi di meritare.',
    id: 'successo',
    questionCount: 12,
    signal: 'La maschera che misura.',
    title: 'Successo',
  },
  {
    accent: '#176B5A',
    description: 'Solitudine, tristezza, mancanze invisibili e bisogno di essere visti.',
    id: 'solitudine',
    questionCount: 8,
    signal: 'La maschera che sorride piano.',
    title: 'Solitudine',
  },
  {
    accent: '#315E9C',
    description: 'Casa, felicità, senso della vita, spiritualità e il futuro che immagini.',
    id: 'senso',
    questionCount: 11,
    signal: 'La maschera che guarda lontano.',
    title: 'Senso',
  },
  {
    accent: '#523071',
    description: 'Un percorso futuro con domande più rare, sbloccabile quando avremo più storico.',
    id: 'ombra',
    locked: true,
    questionCount: 0,
    signal: 'La maschera che non risponde ancora.',
    title: 'Ombra',
  },
];

export const localizedMaskPathCopy: Record<
  AppLanguageCode,
  Record<MaskPathId, Pick<MaskPath, 'description' | 'signal' | 'title'>>
> = {
  it: {
    amore: {
      description: 'Le domande che parlano di amore, partner, passione e legami che restano.',
      signal: 'La maschera che cerca conferme.',
      title: 'Amore',
    },
    paura: {
      description: 'Paure, fallimenti, ferite e verità che non si lasciano guardare subito.',
      signal: 'La maschera che protegge.',
      title: 'Paura',
    },
    successo: {
      description: 'Soldi, successo, lavoro, ambizione e ciò che pensi di meritare.',
      signal: 'La maschera che misura.',
      title: 'Successo',
    },
    solitudine: {
      description: 'Solitudine, tristezza, mancanze invisibili e bisogno di essere visti.',
      signal: 'La maschera che sorride piano.',
      title: 'Solitudine',
    },
    senso: {
      description: 'Casa, felicità, senso della vita, spiritualità e il futuro che immagini.',
      signal: 'La maschera che guarda lontano.',
      title: 'Senso',
    },
    ombra: {
      description: 'Un percorso futuro con domande più rare, sbloccabile quando avremo più storico.',
      signal: 'La maschera che non risponde ancora.',
      title: 'Ombra',
    },
  },
  en: {
    amore: {
      description: 'Questions about love, partners, passion, and bonds that remain.',
      signal: 'The mask that seeks reassurance.',
      title: 'Love',
    },
    paura: {
      description: 'Fears, failures, wounds, and truths that cannot be looked at immediately.',
      signal: 'The mask that protects.',
      title: 'Fear',
    },
    successo: {
      description: 'Money, success, work, ambition, and what you believe you deserve.',
      signal: 'The mask that measures.',
      title: 'Success',
    },
    solitudine: {
      description: 'Loneliness, sadness, invisible absences, and the need to be seen.',
      signal: 'The mask that smiles softly.',
      title: 'Solitude',
    },
    senso: {
      description: 'Home, happiness, life meaning, spirituality, and the future you imagine.',
      signal: 'The mask that looks far away.',
      title: 'Meaning',
    },
    ombra: {
      description: 'A future path with rarer questions, unlocked when there is more history.',
      signal: 'The mask that does not answer yet.',
      title: 'Shadow',
    },
  },
  uk: {
    amore: {
      description: 'Запитання про любов, партнера, пристрасть і зв’язки, що залишаються.',
      signal: 'Маска, що шукає підтвердження.',
      title: 'Любов',
    },
    paura: {
      description: 'Страхи, невдачі, рани і правди, на які не виходить дивитися одразу.',
      signal: 'Маска, що захищає.',
      title: 'Страх',
    },
    successo: {
      description: 'Гроші, успіх, робота, амбіція і те, що ти вважаєш заслуженим.',
      signal: 'Маска, що вимірює.',
      title: 'Успіх',
    },
    solitudine: {
      description: 'Самотність, смуток, невидимі нестачі і потреба бути побаченим.',
      signal: 'Маска, що тихо усміхається.',
      title: 'Самотність',
    },
    senso: {
      description: 'Дім, щастя, сенс життя, духовність і майбутнє, яке ти уявляєш.',
      signal: 'Маска, що дивиться далеко.',
      title: 'Сенс',
    },
    ombra: {
      description: 'Майбутній шлях із рідкіснішими запитаннями, відкриється, коли буде більше історії.',
      signal: 'Маска, що ще не відповідає.',
      title: 'Тінь',
    },
  },
  ru: {
    amore: {
      description: 'Вопросы о любви, партнёре, страсти и связях, которые остаются.',
      signal: 'Маска, которая ищет подтверждение.',
      title: 'Любовь',
    },
    paura: {
      description: 'Страхи, провалы, раны и правды, на которые не получается смотреть сразу.',
      signal: 'Маска, которая защищает.',
      title: 'Страх',
    },
    successo: {
      description: 'Деньги, успех, работа, амбиция и то, что ты считаешь заслуженным.',
      signal: 'Маска, которая измеряет.',
      title: 'Успех',
    },
    solitudine: {
      description: 'Одиночество, грусть, невидимые нехватки и потребность быть увиденным.',
      signal: 'Маска, которая тихо улыбается.',
      title: 'Одиночество',
    },
    senso: {
      description: 'Дом, счастье, смысл жизни, духовность и будущее, которое ты представляешь.',
      signal: 'Маска, которая смотрит вдаль.',
      title: 'Смысл',
    },
    ombra: {
      description: 'Будущий путь с более редкими вопросами, который откроется, когда будет больше истории.',
      signal: 'Маска, которая ещё не отвечает.',
      title: 'Тень',
    },
  },
  es: {
    amore: {
      description: 'Preguntas sobre amor, pareja, pasión y vínculos que permanecen.',
      signal: 'La máscara que busca confirmación.',
      title: 'Amor',
    },
    paura: {
      description: 'Miedos, fracasos, heridas y verdades que no se dejan mirar enseguida.',
      signal: 'La máscara que protege.',
      title: 'Miedo',
    },
    successo: {
      description: 'Dinero, éxito, trabajo, ambición y lo que crees merecer.',
      signal: 'La máscara que mide.',
      title: 'Éxito',
    },
    solitudine: {
      description: 'Soledad, tristeza, faltas invisibles y necesidad de ser visto.',
      signal: 'La máscara que sonríe despacio.',
      title: 'Soledad',
    },
    senso: {
      description: 'Casa, felicidad, sentido de la vida, espiritualidad y el futuro que imaginas.',
      signal: 'La máscara que mira lejos.',
      title: 'Sentido',
    },
    ombra: {
      description: 'Un recorrido futuro con preguntas más raras, desbloqueado cuando haya más historia.',
      signal: 'La máscara que aún no responde.',
      title: 'Sombra',
    },
  },
};

export function localizeMaskPath(path: MaskPath, language: AppLanguageCode): MaskPath {
  return {
    ...path,
    ...localizedMaskPathCopy[language][path.id],
  };
}
