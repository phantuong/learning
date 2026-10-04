// Grade 1 source-backed ingestion registry: Measurement, Time, Money, Data.
// IMPORTANT: entries describe source payloads/worksheets; do not synthesize questions
// until the referenced payload and answer are actually collected and QA-approved.

export const measurementTimeMoneyDataSources = [
  {
    id: 'k5-measurement-grade1',
    source: 'K5 Learning',
    topic: 'Measurement',
    skills: [
      'longer-shorter', 'taller-shorter', 'order-three-by-length',
      'non-standard-units', 'measure-inches', 'measure-centimeters',
      'ruler-measurement', 'compare-lengths', 'heavier-lighter',
      'more-less-capacity', 'length-word-problems'
    ],
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/measurement',
    status: 'source-cataloged',
    payloadRequired: true
  },
  {
    id: 'k5-money-grade1',
    source: 'K5 Learning',
    topic: 'Money',
    skills: [
      'identify-coins', 'match-coin-name-value', 'count-pennies-dimes',
      'count-pennies-nickels-dimes', 'count-nickels-quarters',
      'count-all-common-coins', 'money-word-problems'
    ],
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/counting-money',
    status: 'source-cataloged',
    payloadRequired: true
  },
  {
    id: 'k5-money-pennies-dimes-a',
    source: 'K5 Learning',
    topic: 'Money',
    skill: 'count-pennies-dimes',
    sourceUrl: 'https://www.k5learning.com/worksheets/math/grade-1-counting-money-pennies-dimes-a.pdf',
    status: 'payload-available',
    responseType: 'numeric',
    answerUnit: 'cents',
    questionCount: 8,
    payloadRequired: true,
    visualRequired: true
  },
  {
    id: 'k5-data-graphing-grade1',
    source: 'K5 Learning',
    topic: 'Data & Graphing',
    skills: [
      'same-different', 'belong-not-belong', 'sort-data', 'sort-and-count',
      'tally-marks', 'tally-sheets', 'pictographs', 'create-bar-charts',
      'read-bar-charts', 'analyze-bar-graphs', 'collect-data'
    ],
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/data-graphing',
    status: 'source-cataloged',
    payloadRequired: true
  },
  {
    id: 'k5-word-problems-grade1-cross-topic',
    source: 'K5 Learning',
    topic: 'Word Problems',
    skills: [
      'time-word-problems', 'money-word-problems',
      'measurement-word-problems', 'fraction-word-problems',
      'mixed-word-problems'
    ],
    sourceUrl: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/word-problems',
    status: 'source-cataloged',
    payloadRequired: true
  }
];

export const sourcePayloadRules = {
  rejectSyntheticPayload: true,
  requireSourceReference: true,
  requireOriginalPayload: true,
  requireAnswer: true,
  requireVisualForVisualQuestion: true,
  rejectTitleOnlyEntry: true
};
