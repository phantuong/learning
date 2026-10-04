// Grade 1 Time + Data payload extraction plan.
// This is an ingestion manifest, not copied third-party question content.
// A source item becomes production only after the original licensed payload/assets
// are supplied and the QA gate is satisfied.

const TIME_DATA_EXTRACTION_PLAN_V1 = {
  version: 1,
  rule: 'Do not synthesize missing source questions.',
  requiredPayload: [
    'source',
    'sourceReference',
    'originalPrompt',
    'answer',
    'visualAssetsWhenRequired',
    'answerUniqueness',
    'qaResult'
  ],
  batches: [
    {
      id: 'data-tally',
      source: 'K5 Learning',
      reference: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/data-graphing/tally-sheets',
      structures: ['two-group-tally-sheet', 'three-group-tally-sheet', 'tally-sheet-with-questions'],
      nextStatus: 'extract-licensed-payload'
    },
    {
      id: 'data-graphs',
      source: 'K5 Learning',
      reference: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/data-graphing',
      structures: ['pictographs', 'bar-charts', 'reading-bar-charts', 'collecting-data'],
      nextStatus: 'extract-licensed-payload'
    },
    {
      id: 'time-clocks',
      source: 'K5 Learning',
      reference: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/telling-time',
      structures: ['whole-hour', 'half-hour', 'quarter-hour', 'calendar', 'elapsed-time'],
      nextStatus: 'extract-licensed-payload'
    },
    {
      id: 'time-money',
      source: 'Education.com',
      reference: 'https://www.education.com/resources/grade-1/worksheets/math/time-money/',
      structures: ['analog-clock', 'calendar', 'counting-coins', 'coin-values', 'money-comparison', 'elapsed-time'],
      nextStatus: 'extract-licensed-payload'
    }
  ]
};

if (typeof module !== 'undefined') module.exports = TIME_DATA_EXTRACTION_PLAN_V1;
