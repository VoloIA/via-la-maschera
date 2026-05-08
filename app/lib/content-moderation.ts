export const CONTENT_MODERATION_VERSION = '2026-05-08';

type ModerationResult =
  | { allowed: true }
  | { allowed: false; reason: 'contact' | 'objectionable' };

const objectionablePatterns = [
  /\b(kill\s+yourself|go\s+die|i\s+will\s+kill|rape|porn|porno|nazi|terrorist)\b/i,
  /\b(ucciditi|ammazzati|ti\s+uccido|stupro|violentare|nazista|terrorista)\b/i,
  /\b(muerete|te\s+voy\s+a\s+matar|violacion|violar|nazi|terrorista)\b/i,
  /(?:убей\s+себя|я\s+тебя\s+убью|изнасил|порно|нацист|террорист)/i,
  /(?:убий\s+себе|я\s+тебе\s+вб'ю|зґвалт|порно|нацист|терорист)/i,
];

const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const phonePattern = /(?:\+?\d[\s().-]*){8,}/;
const urlPattern = /\b(?:https?:\/\/|www\.)\S+\b/i;

function normalizeContent(content: string) {
  return content
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function moderateSharedAnswer(content: string): ModerationResult {
  const normalizedContent = normalizeContent(content);

  if (
    emailPattern.test(normalizedContent) ||
    phonePattern.test(normalizedContent) ||
    urlPattern.test(normalizedContent)
  ) {
    return { allowed: false, reason: 'contact' };
  }

  if (objectionablePatterns.some((pattern) => pattern.test(normalizedContent))) {
    return { allowed: false, reason: 'objectionable' };
  }

  return { allowed: true };
}
