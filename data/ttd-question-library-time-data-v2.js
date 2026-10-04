/**
 * Grade 1 Time / Data ingestion manifest v2.
 * Source-backed candidates only; no synthetic production questions.
 */
export const TIME_DATA_SOURCES_V2 = [
  {
    id: 'k5-time-grade1',
    source: 'K5 Learning',
    url: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/telling-time',
    status: 'source-mapped',
    skills: [
      'units-of-time',
      'fast-or-slow',
      'morning-afternoon-night',
      'tell-time-whole-hours',
      'draw-whole-hours',
      'tell-time-half-hours',
      'draw-half-hours',
      'tell-time-quarter-hours',
      'draw-quarter-hours',
      'elapsed-time-one-hour',
      'elapsed-time-multiple-hours',
      'time-word-problems',
      'days-of-week',
      'months-of-year',
    ],
  },
  {
    id: 'education-time-money-grade1',
    source: 'Education.com',
    url: 'https://www.education.com/resources/grade-1/worksheets/math/time-money/?q=grade+1',
    status: 'source-mapped',
    skills: [
      'tell-time',
      'count-coins',
      'coin-values',
      'compare-money-amounts',
      'money-word-problems',
      'elapsed-time',
    ],
  },
  {
    id: 'k5-data-grade1',
    source: 'K5 Learning',
    url: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/data-graphing',
    status: 'source-mapped',
    skills: [
      'same-vs-different',
      'belong-not-belong',
      'sorting-data',
      'sort-and-count',
      'tally-marks',
      'tally-sheets',
      'pictographs',
      'creating-bar-charts',
      'reading-bar-charts',
      'creating-and-analyzing-bar-graphs',
      'collecting-data',
    ],
  },
];

export const TIME_DATA_INGESTION_POLICY_V2 = {
  rejectSyntheticPayload: true,
  requireOriginalSourceReference: true,
  requireAnswerOrVerifiedResponseRule: true,
  requireVisualAssetForVisualQuestion: true,
  catalogOnlyDoesNotEnterProduction: true,
};
