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
    accent: '#7C3AED',
    description: 'Le domande che parlano di amore, partner, passione e legami che restano.',
    id: 'amore',
    questionCount: 9,
    signal: 'La maschera che cerca conferme.',
    title: 'Amore',
  },
  {
    accent: '#BE123C',
    description: 'Paure, fallimenti, ferite e verita che non si lasciano guardare subito.',
    id: 'paura',
    questionCount: 10,
    signal: 'La maschera che protegge.',
    title: 'Paura',
  },
  {
    accent: '#B45309',
    description: 'Soldi, successo, lavoro, ambizione e cio che pensi di meritare.',
    id: 'successo',
    questionCount: 12,
    signal: 'La maschera che misura.',
    title: 'Successo',
  },
  {
    accent: '#0F766E',
    description: 'Solitudine, tristezza, mancanze invisibili e bisogno di essere visti.',
    id: 'solitudine',
    questionCount: 8,
    signal: 'La maschera che sorride piano.',
    title: 'Solitudine',
  },
  {
    accent: '#1D4ED8',
    description: 'Casa, felicita, senso della vita, spiritualita e il futuro che immagini.',
    id: 'senso',
    questionCount: 11,
    signal: 'La maschera che guarda lontano.',
    title: 'Senso',
  },
  {
    accent: '#6D28D9',
    description: 'Un percorso futuro con domande piu rare, sbloccabile quando avremo piu storico.',
    id: 'ombra',
    locked: true,
    questionCount: 0,
    signal: 'La maschera che non risponde ancora.',
    title: 'Ombra',
  },
];
