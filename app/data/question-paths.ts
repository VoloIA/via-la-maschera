import { maskPaths, type MaskPath, type MaskPathId } from '@/data/mask-paths';

export const questionPathIds: MaskPathId[] = [
  'senso',
  'senso',
  'senso',
  'senso',
  'solitudine',
  'amore',
  'successo',
  'successo',
  'successo',
  'senso',
  'senso',
  'senso',
  'successo',
  'amore',
  'amore',
  'amore',
  'amore',
  'amore',
  'amore',
  'amore',
  'amore',
  'solitudine',
  'senso',
  'successo',
  'successo',
  'successo',
  'successo',
  'successo',
  'paura',
  'paura',
  'paura',
  'solitudine',
  'solitudine',
  'solitudine',
  'paura',
  'senso',
  'successo',
  'paura',
  'paura',
  'paura',
  'paura',
  'paura',
  'paura',
  'paura',
  'paura',
  'paura',
  'paura',
  'solitudine',
  'senso',
  'paura',
  'senso',
  'senso',
  'senso',
  'senso',
  'senso',
  'senso',
  'senso',
  'senso',
];

export const fallbackMaskPath = maskPaths[0];

export function getMaskPathById(pathId: MaskPathId): MaskPath {
  return maskPaths.find((path) => path.id === pathId) ?? fallbackMaskPath;
}

export function getMaskPathForQuestionIndex(questionIndex: number): MaskPath {
  return getMaskPathById(questionPathIds[questionIndex] ?? fallbackMaskPath.id);
}
