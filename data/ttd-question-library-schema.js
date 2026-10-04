// Grade 1 Thinking Math — Question Library schema
// This file defines the contract for real source questions before they enter production.

export const TTD_QUESTION_SCHEMA_VERSION = '1.0';

export const QUESTION_TYPES = [
  'multiple-choice',
  'multi-select',
  'short-answer',
  'matching',
  'sorting',
  'sequence',
  'visual-selection',
];

export const REQUIRED_FIELDS = [
  'id', 'source', 'grade', 'topic', 'skill', 'type',
  'prompt', 'choices', 'answer', 'explanation', 'status'
];

export const SOURCE_REQUIRED_FIELDS = [
  'publisher', 'title', 'url', 'contentId'
];

export const PRODUCTION_GATES = {
  sourcePresent: true,
  promptPresent: true,
  choicesPresentForChoiceQuestions: true,
  answerPresent: true,
  answerMatchesChoice: true,
  explanationPresent: true,
  uniqueCorrectAnswer: true,
  visualContextRequiredWhenVisual: true,
  noPlaceholderContent: true,
  noEmptyQuestion: true,
};

export const QUESTION_STATUS = {
  INVENTORIED: 'inventoried',
  COLLECTED: 'collected',
  NORMALIZED: 'normalized',
  QA_FAILED: 'qa-failed',
  APPROVED: 'approved',
  PRODUCTION: 'production',
};

export function validateQuestion(q) {
  const errors = [];
  for (const field of REQUIRED_FIELDS) {
    if (q?.[field] === undefined || q?.[field] === null || q?.[field] === '') {
      errors.push(`missing:${field}`);
    }
  }
  for (const field of SOURCE_REQUIRED_FIELDS) {
    if (q?.source?.[field] === undefined || q?.source?.[field] === null || q?.source?.[field] === '') {
      errors.push(`missing:source.${field}`);
    }
  }

  if (q?.type === 'multiple-choice' || q?.type === 'visual-selection') {
    if (!Array.isArray(q.choices) || q.choices.length < 2) errors.push('choices:insufficient');
    if (Array.isArray(q.choices) && q.answer !== undefined && !q.choices.some(c => c.id === q.answer || c.value === q.answer)) {
      errors.push('answer:not-in-choices');
    }
  }

  if (q?.visualRequired && !q.visual) errors.push('visual:missing');
  if (typeof q?.prompt === 'string' && /placeholder|coming soon|test question|lorem ipsum/i.test(q.prompt)) {
    errors.push('prompt:placeholder');
  }

  return { valid: errors.length === 0, errors };
}

// Production rule: only questions explicitly approved by QA may be consumed by Practice.
export function isProductionQuestion(q) {
  return q?.status === QUESTION_STATUS.PRODUCTION && validateQuestion(q).valid;
}
