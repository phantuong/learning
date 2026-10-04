// Grade 1 Time + Data source-backed payload manifests.
// This file records only source structures that are publicly verifiable.
// It does NOT copy protected worksheet text or artwork.

const TIME_DATA_PAYLOADS_V1 = {
  version: 1,
  policy: {
    syntheticPayloadAllowed: false,
    productionRequires: [
      'source',
      'sourceReference',
      'originalPrompt',
      'answer',
      'visualVerifiedWhenRequired',
      'uniqueAnswer',
      'qaPassed'
    ]
  },
  sources: [
    {
      source: 'K5 Learning',
      area: 'data-graphing',
      reference: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/data-graphing',
      verifiedStructures: [
        'same-vs-different',
        'belong-not-belong',
        'sorting-data',
        'sort-and-count',
        'tally-marks',
        'tally-sheets',
        'pictographs',
        'creating-bar-charts',
        'reading-bar-charts',
        'bar-graphs',
        'collecting-data'
      ],
      status: 'source-verified'
    },
    {
      source: 'K5 Learning',
      area: 'data-graphing',
      reference: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/data-graphing/tally-sheets',
      verifiedStructures: [
        'two-group-tally-sheet',
        'three-group-tally-sheet',
        'tally-sheet-with-questions'
      ],
      status: 'source-verified'
    },
    {
      source: 'Education.com',
      area: 'time-money',
      reference: 'https://www.education.com/resources/grade-1/worksheets/math/time-money/',
      verifiedStructures: [
        'analog-clock-reading',
        'on-the-hour',
        'calendar-days-and-dates',
        'counting-coins',
        'coin-values',
        'comparing-money-amounts',
        'money-word-problems',
        'elapsed-time'
      ],
      status: 'source-verified'
    },
    {
      source: 'Education.com',
      area: 'time-money',
      reference: 'https://www.education.com/resources/grade-1/worksheets/math/time-money/?common-core=yes&q=1st+grade+worksheets',
      verifiedStructures: [
        'match-clock-to-written-time',
        'counting-coins-to-purchase-item'
      ],
      status: 'source-verified'
    }
  ]
};

if (typeof module !== 'undefined') module.exports = TIME_DATA_PAYLOADS_V1;
