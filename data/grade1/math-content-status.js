// Grade 1 Math content pipeline status.
// This file is intentionally metadata-only: it never promotes a source catalog
// entry to production unless the original question payload and answer are verified.

const GRADE1_MATH_CONTENT_STATUS = {
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
  tracks: [
    { id: 'numbers-counting', status: 'ingestion' },
    { id: 'addition-subtraction', status: 'ingestion' },
    { id: 'patterns', status: 'ingestion' },
    { id: 'geometry', status: 'ingestion' },
    { id: 'spatial-reasoning', status: 'cataloged' },
    { id: 'measurement', status: 'ingestion' },
    { id: 'time-calendar', status: 'ingestion' },
    { id: 'money', status: 'ingestion' },
    { id: 'data-graphs', status: 'ingestion' },
    { id: 'fractions', status: 'cataloged' },
    { id: 'logic-problem-solving', status: 'cataloged' }
  ],
  nextBatch: 'time-data-payloads'
};

if (typeof module !== 'undefined') module.exports = GRADE1_MATH_CONTENT_STATUS;
