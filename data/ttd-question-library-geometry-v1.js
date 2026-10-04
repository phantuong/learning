// Grade 1 Geometry — source-backed ingestion manifest
// This batch records concrete source payloads that are publicly retrievable.
// Do not convert a worksheet title into a fabricated question.

export const geometryIngestionV1 = [
  {
    id: 'k5-g1-geometry-match-shapes-names',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/worksheets/math/grade-1-geometry-match-shapes-to-names.pdf',
    grade: 1,
    topic: 'Geometry',
    skill: 'Match 2D shapes to names',
    type: 'matching',
    instruction: 'Draw lines between each shape and its name.',
    entities: ['oval', 'triangle', 'circle', 'square', 'rectangle', 'diamond'],
    answerOrder: ['oval', 'triangle', 'circle', 'square', 'rectangle', 'diamond'],
    sourcePayloadVerified: true,
    visualAssetRequired: true,
    status: 'source-verified',
    notes: 'The PDF contains the worksheet and answer page. The exact visual positions must be preserved when converting to interactive form.'
  },
  {
    id: 'k5-g1-geometry-identify-squares',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/worksheets/math/grade-1-geometry-identify-squares.pdf',
    grade: 1,
    topic: 'Geometry',
    skill: 'Identify squares',
    type: 'visual-identification',
    instruction: 'Trace the square. Draw 2 smaller and 2 bigger squares. Find 3 squares and color them.',
    tasks: [
      'trace the square',
      'draw 2 smaller squares',
      'draw 2 bigger squares',
      'find 3 squares and color them'
    ],
    sourcePayloadVerified: true,
    visualAssetRequired: true,
    status: 'source-verified',
    notes: 'This is a multi-part worksheet rather than a single multiple-choice question; keep it as multiple interactive tasks instead of inventing choices.'
  },
  {
    id: 'k5-g1-geometry-identify-shapes',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/geometry/shapes-identify',
    grade: 1,
    topic: 'Geometry',
    skill: 'Identify basic 2D shapes',
    type: 'visual-identification',
    entities: ['square', 'rectangle', 'triangle', 'circle', 'oval', 'diamond'],
    worksheets: [1, 2, 3, 4, 5, 6],
    sourcePayloadVerified: true,
    visualAssetRequired: true,
    status: 'source-verified',
    notes: 'The page exposes six worksheet variants; individual worksheet visuals need to be captured before production conversion.'
  }
];
