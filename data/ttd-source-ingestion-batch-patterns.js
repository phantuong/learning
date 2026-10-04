// Licensed-content ingestion manifest for Grade 1 Patterns.
// This file intentionally stores source references and extracted structure only.
// Full publisher assets/questions should only be populated where the licensed
// source payload is actually available to the project.

export const TTD_PATTERN_SOURCE_BATCH = [
  {
    source: 'Education.com',
    sourceUrl: 'https://www.education.com/resources/grade-1/math/patterns/shape-patterns/',
    grade: 1,
    topic: 'patterns',
    skills: [
      'shape-patterns',
      'what-comes-next',
      'recognize-patterns',
      'complete-pattern',
      'AB-pattern',
      'ABC-pattern',
      'AABB-pattern',
      'pattern-sequence',
      'pattern-identification',
    ],
    inventoryCount: 69,
    status: 'source-indexed',
  },
  {
    source: 'Education.com',
    sourceUrl: 'https://www.education.com/resources/grade-1/worksheets/math/patterns/',
    grade: 1,
    topic: 'patterns',
    skills: ['color-patterns', 'shape-patterns', 'number-patterns'],
    inventoryCount: 90,
    status: 'source-indexed',
  },
  {
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/number-patterns',
    grade: 1,
    topic: 'patterns',
    skills: [
      'object-patterns',
      'counting-patterns',
      'extend-number-patterns',
      'identify-pattern-rule',
      'input-output-patterns',
      'find-number-pattern',
    ],
    status: 'source-indexed',
  },
  {
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/worksheets/math/grade-1-patterns-objects-f.pdf',
    grade: 1,
    topic: 'patterns',
    skills: ['object-patterns', 'complete-repeating-pattern'],
    extractedStructure: {
      rows: 4,
      missingPosition: 'last-item',
      repeatingElements: 2,
      visual: true,
    },
    status: 'payload-structure-indexed',
  },
];

export const TTD_PATTERN_INGESTION_RULES = {
  doNotGenerateFromTitle: true,
  requireSourceReference: true,
  requireQuestionPayload: true,
  requireAnswer: true,
  requireUniqueAnswer: true,
  requireVisualForVisualQuestion: true,
  rejectPlaceholderQuestions: true,
};
