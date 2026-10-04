// Production gate for Grade 1 Time + Data content.
// This file intentionally contains no copied third-party question text or artwork.
// Only source-backed records that have passed the required checks may be promoted.

const TIME_DATA_PRODUCTION_GATE_V1 = {
  version: 1,
  productionAllowedOnlyWhen: [
    'source',
    'sourceReference',
    'originalPrompt',
    'answer',
    'visualVerifiedWhenRequired',
    'uniqueAnswer',
    'qaPassed'
  ],
  rejectWhen: [
    'syntheticPrompt',
    'missingAnswer',
    'ambiguousAnswer',
    'missingVisual',
    'unverifiedVisual',
    'missingProvenance'
  ],
  sourceBatches: [
    {
      source: 'K5 Learning',
      areas: ['data-graphing'],
      reference: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/data-graphing',
      status: 'ready-for-payload-extraction'
    },
    {
      source: 'K5 Learning',
      areas: ['time', 'calendar', 'money'],
      reference: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/telling-time',
      status: 'ready-for-payload-extraction'
    },
    {
      source: 'Education.com',
      areas: ['time', 'money'],
      reference: 'https://www.education.com/resources/grade-1/worksheets/math/time-money/',
      status: 'source-verified'
    }
  ],
  nextStep: 'extract-source-payloads-before-production',
};

if (typeof module !== 'undefined') module.exports = TIME_DATA_PRODUCTION_GATE_V1;
