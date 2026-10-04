// Grade 1 Logic & Problem Solving content inventory.
// Inventory only: source-backed skill taxonomy; no fabricated question payloads.

export const ttdLogicInventory = [
  { id: 'logic-classification', topic: 'logic', skill: 'classification', types: ['sort-by-attribute', 'odd-one-out', 'venn-diagram'], sources: ['IXL', 'Education.com', 'Twinkl'] },
  { id: 'logic-sequences', topic: 'logic', skill: 'sequences', types: ['number-sequence', 'shape-sequence', 'what-comes-next'], sources: ['IXL', 'Education.com', 'K5 Learning', 'Biglearners'] },
  { id: 'logic-pattern-reasoning', topic: 'logic', skill: 'pattern-reasoning', types: ['complete-pattern', 'next-shape', 'growing-pattern'], sources: ['IXL', 'Education.com', 'Twinkl', 'Math Salamanders'] },
  { id: 'logic-comparison', topic: 'logic', skill: 'comparison-reasoning', types: ['more-fewer', 'greater-less', 'compare-quantities'], sources: ['IXL', 'K5 Learning'] },
  { id: 'logic-word-problems', topic: 'problem-solving', skill: 'word-problems', types: ['add-to', 'take-from', 'put-together', 'take-apart', 'compare', 'unknown-position'], sources: ['IXL', 'K5 Learning', 'Education.com'] },
  { id: 'logic-model-selection', topic: 'problem-solving', skill: 'model-selection', types: ['choose-model', 'match-equation-to-story', 'match-story-to-equation'], sources: ['IXL'] },
  { id: 'logic-missing-information', topic: 'problem-solving', skill: 'missing-information', types: ['find-missing-number', 'missing-part', 'unknown-addend'], sources: ['IXL', 'K5 Learning'] },
  { id: 'logic-true-false', topic: 'problem-solving', skill: 'reason-about-statements', types: ['true-false-equation', 'which-sign-makes-true', 'always-sometimes-never'], sources: ['IXL'] },
  { id: 'logic-ordering', topic: 'logic', skill: 'ordering', types: ['order-numbers', 'ordinal-position', 'order-by-attribute'], sources: ['IXL', 'K5 Learning', 'Biglearners'] },
  { id: 'logic-visual-reasoning', topic: 'logic', skill: 'visual-reasoning', types: ['visual-classification', 'visual-comparison', 'spatial-choice'], sources: ['Twinkl', 'Math Salamanders', 'Biglearners'] },
  { id: 'logic-real-world', topic: 'problem-solving', skill: 'real-world-problem-solving', types: ['shopping', 'time-events', 'measurement-context', 'data-context'], sources: ['IXL', 'Education.com', 'K5 Learning'] }
];

export const ttdLogicInventoryMeta = {
  grade: 1,
  status: 'inventory',
  note: 'Use source-provided question payloads when available; do not generate replacement questions merely to fill inventory counts.',
  validation: {
    requireSource: true,
    requireAnswer: true,
    requireQuestionContext: true,
    requireUniqueSolution: true
  }
};
