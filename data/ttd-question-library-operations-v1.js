/**
 * Grade 1 Operations — source-backed ingestion index.
 *
 * IMPORTANT: This file stores source/provenance metadata only for resources
 * whose public pages expose the question payload or worksheet structure.
 * Do not treat a resource title as a question. Promote to production only
 * after prompt, response/choices, answer and required visual assets pass QA.
 */

export const operationsSourcesV1 = [
  {
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/addition',
    grade: 1,
    topic: 'addition',
    skills: [
      'addition-with-pictures',
      'addition-number-line',
      'number-bonds',
      'doubles',
      'near-doubles',
      'missing-addends',
      'add-3-numbers',
      'complete-next-ten',
      'addition-word-problems',
    ],
    payloadStatus: 'source-verified',
  },
  {
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/topics/addition',
    grade: 1,
    topic: 'addition',
    skills: [
      'addition-facts',
      'missing-addends',
      'number-bonds',
      'doubles-and-near-doubles',
      'whole-tens',
      'column-addition-no-regrouping',
      'addition-word-problems',
    ],
    payloadStatus: 'source-verified',
  },
  {
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/worksheets/math-drills/addition/missing-addends-addition-facts-a.pdf',
    grade: 1,
    topic: 'addition',
    skill: 'missing-addends',
    type: 'worksheet',
    payloadStatus: 'payload-visible',
    qaRequired: ['answer-key-check', 'grade-fit', 'visual-check'],
  },
  {
    source: 'Education.com',
    sourceUrl: 'https://www.education.com/resources/grade-1/worksheets/math/addition/',
    grade: 1,
    topic: 'addition',
    skills: [
      'addition-within-20',
      'number-lines',
      'fact-fluency',
      'visual-addition',
    ],
    resourceCount: 629,
    payloadStatus: 'source-verified',
  },
  {
    source: 'Education.com',
    sourceUrl: 'https://www.education.com/resources/grade-1/worksheets/math/mixed-operations/addition-subtraction/',
    grade: 1,
    topic: 'mixed-operations',
    skills: [
      'fact-families',
      'fact-fluency',
      'mixed-addition-subtraction',
      'word-problems',
      'balance-equations',
    ],
    resourceCount: 94,
    payloadStatus: 'source-verified',
  },
  {
    source: 'Education.com',
    sourceUrl: 'https://www.education.com/resources/grade-1/interactive-worksheets/math/mixed-operations/addition-subtraction/',
    grade: 1,
    topic: 'mixed-operations',
    skills: [
      'fact-families',
      'fact-fluency',
      'mixed-practice',
      'word-problems',
    ],
    resourceCount: 50,
    payloadStatus: 'source-verified',
  },
];

export const operationsIngestionPolicyV1 = {
  productionRequires: [
    'source',
    'originalIdOrStableReference',
    'prompt',
    'responseModel',
    'answer',
    'explanation',
  ],
  visualRequiredWhen: [
    'question references an image/object/number line',
    'answer depends on a worksheet graphic',
  ],
  rejectWhen: [
    'title-only',
    'missing-answer',
    'ambiguous-answer',
    'missing-visual',
    'unverified-provenance',
  ],
};
