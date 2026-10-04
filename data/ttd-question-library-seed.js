// Licensed-source ingestion seed for Grade 1 Math.
// This file records question candidates discovered from public source pages.
// It deliberately stores metadata/instructions, not fabricated question payloads.
// Full worksheet payloads are ingested only when the source page exposes them.

export const TTD_SOURCE_QUESTION_SEED = [
  {
    id: 'edu-pattern-shape-01',
    source: 'Education.com',
    sourceUrl: 'https://www.education.com/resources/grade-1/worksheets/math/patterns/',
    grade: 1,
    topic: 'patterns',
    skill: 'shape-patterns',
    type: 'sequence-completion',
    status: 'source-candidate',
    title: 'Shape Patterns',
    expectedStructure: 'sequence with a missing/next shape and answer choices',
  },
  {
    id: 'edu-pattern-recognizing-01',
    source: 'Education.com',
    sourceUrl: 'https://www.education.com/resources/grade-1/math/patterns/',
    grade: 1,
    topic: 'patterns',
    skill: 'recognize-and-extend-patterns',
    type: 'sequence-completion',
    status: 'source-candidate',
    title: 'Recognizing Patterns: What Comes Next? #1',
    expectedStructure: 'mixed shape/color sequence requiring the next element',
  },
  {
    id: 'edu-geometry-match-shape-01',
    source: 'Education.com',
    sourceUrl: 'https://www.education.com/resources/grade-1/worksheets/math/geometry/',
    grade: 1,
    topic: 'geometry',
    skill: 'identify-2d-and-3d-shapes',
    type: 'matching',
    status: 'source-candidate',
    title: 'Match That Shape',
    expectedStructure: 'shape illustrations matched to names',
  },
  {
    id: 'k5-object-patterns-01',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/number-patterns/objects',
    grade: 1,
    topic: 'patterns',
    skill: 'object-patterns',
    type: 'sequence-completion',
    status: 'source-candidate',
    title: 'Patterns of objects',
    expectedStructure: '2- or 3-element repeating image pattern to extend',
  },
  {
    id: 'k5-number-patterns-01',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/number-patterns',
    grade: 1,
    topic: 'patterns',
    skill: 'number-patterns',
    type: 'sequence-completion',
    status: 'source-candidate',
    title: 'Grade 1 Number Patterns',
    expectedStructure: 'number sequence using addition/subtraction rules',
  },
  {
    id: 'salamanders-puzzle-01',
    source: 'Math Salamanders',
    sourceUrl: 'https://www.math-salamanders.com/math-puzzles-for-1st-grade.html',
    grade: 1,
    topic: 'logic-problem-solving',
    skill: 'constraint-reasoning',
    type: 'logic-puzzle',
    status: 'source-candidate',
    title: 'Salamander Line-Up',
    expectedStructure: 'grid placement under row/column constraints',
  },
  {
    id: 'salamanders-puzzle-02',
    source: 'Math Salamanders',
    sourceUrl: 'https://www.math-salamanders.com/math-puzzles-for-1st-grade.html',
    grade: 1,
    topic: 'logic-problem-solving',
    skill: 'constraint-reasoning',
    type: 'logic-puzzle',
    status: 'source-candidate',
    title: 'Tricolor Circles Puzzle',
    expectedStructure: 'coloring constraint where touching circles cannot share a color',
  },
];

export function validateSourceSeed(items = TTD_SOURCE_QUESTION_SEED) {
  const errors = [];
  const ids = new Set();
  for (const item of items) {
    if (!item.id || ids.has(item.id)) errors.push(`Invalid/duplicate id: ${item.id}`);
    ids.add(item.id);
    if (!item.source || !item.sourceUrl) errors.push(`${item.id}: missing source provenance`);
    if (!item.title) errors.push(`${item.id}: missing source title`);
    if (!item.topic || !item.skill) errors.push(`${item.id}: missing classification`);
    if (!item.expectedStructure) errors.push(`${item.id}: missing expected question structure`);
  }
  return { valid: errors.length === 0, errors, count: items.length };
}
