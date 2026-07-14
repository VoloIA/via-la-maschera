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
    description: 'Domande su amore, coppia, passione e legami importanti.',
    id: 'amore',
    questionCount: 9,
    signal: 'Il bisogno di conferme e vicinanza.',
    title: 'Amore',
  },
  {
    accent: '#8B2F45',
    description: 'Domande su paure, fallimenti, ferite e verità difficili da affrontare.',
    id: 'paura',
    questionCount: 10,
    signal: 'Ciò da cui cerchi di proteggerti.',
    title: 'Paura',
  },
  {
    accent: '#A85D16',
    description: 'Domande su denaro, lavoro, ambizione, successo e valore personale.',
    id: 'successo',
    questionCount: 12,
    signal: 'Il modo in cui misuri il tuo valore.',
    title: 'Successo',
  },
  {
    accent: '#176B5A',
    description: 'Domande su solitudine, tristezza e bisogno di sentirsi visti e compresi.',
    id: 'solitudine',
    questionCount: 8,
    signal: 'Il bisogno di sentirti visto e compreso.',
    title: 'Solitudine',
  },
  {
    accent: '#315E9C',
    description: 'Domande su casa, felicità, spiritualità, futuro e significato della vita.',
    id: 'senso',
    questionCount: 11,
    signal: 'Le domande con cui guardi al futuro.',
    title: 'Senso',
  },
  {
    accent: '#523071',
    description: 'Un nuovo percorso con domande diverse, disponibile in un prossimo aggiornamento.',
    id: 'ombra',
    locked: true,
    questionCount: 0,
    signal: 'Nuove domande in arrivo.',
    title: 'Ombra',
  },
];

export const localizedMaskPathCopy: Record<
  AppLanguageCode,
  Record<MaskPathId, Pick<MaskPath, 'description' | 'signal' | 'title'>>
> = {
  it: {
    amore: {
      description: 'Domande su amore, coppia, passione e legami importanti.',
      signal: 'Il bisogno di conferme e vicinanza.',
      title: 'Amore',
    },
    paura: {
      description: 'Domande su paure, fallimenti, ferite e verità difficili da affrontare.',
      signal: 'Ciò da cui cerchi di proteggerti.',
      title: 'Paura',
    },
    successo: {
      description: 'Domande su denaro, lavoro, ambizione, successo e valore personale.',
      signal: 'Il modo in cui misuri il tuo valore.',
      title: 'Successo',
    },
    solitudine: {
      description: 'Domande su solitudine, tristezza e bisogno di sentirsi visti e compresi.',
      signal: 'Il bisogno di sentirti visto e compreso.',
      title: 'Solitudine',
    },
    senso: {
      description: 'Domande su casa, felicità, spiritualità, futuro e significato della vita.',
      signal: 'Le domande con cui guardi al futuro.',
      title: 'Senso',
    },
    ombra: {
      description: 'Un nuovo percorso con domande diverse, disponibile in un prossimo aggiornamento.',
      signal: 'Nuove domande in arrivo.',
      title: 'Ombra',
    },
  },
  en: {
    amore: {
      description: 'Questions about love, relationships, passion, and important bonds.',
      signal: 'The need for reassurance and closeness.',
      title: 'Love',
    },
    paura: {
      description: 'Questions about fears, failures, painful experiences, and difficult truths.',
      signal: 'What you are trying to protect yourself from.',
      title: 'Fear',
    },
    successo: {
      description: 'Questions about money, work, ambition, success, and self-worth.',
      signal: 'How you measure your own value.',
      title: 'Success',
    },
    solitudine: {
      description: 'Questions about loneliness, sadness, and the need to feel seen and understood.',
      signal: 'The need to feel seen and understood.',
      title: 'Solitude',
    },
    senso: {
      description: 'Questions about home, happiness, spirituality, the future, and the meaning of life.',
      signal: 'The questions you use to look toward the future.',
      title: 'Meaning',
    },
    ombra: {
      description: 'A new path with different questions, coming in a future update.',
      signal: 'More questions are coming.',
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
