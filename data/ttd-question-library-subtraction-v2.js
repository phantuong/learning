// Grade 1 subtraction ingestion batch v2
// Source-backed inventory/payload targets. Do not promote entries to production
// until the actual licensed visual/payload has been captured and QA-approved.

export const subtractionV2 = {
  status: 'source-backed-candidates',
  sources: [
    {
      provider: 'K5 Learning',
      url: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/subtraction',
      skills: [
        'subtract-with-objects',
        'subtract-with-number-lines',
        'subtraction-sentences',
        'subtract-within-10',
        'subtract-within-20',
        'count-back',
        'count-up',
        'missing-minuend',
        'missing-subtrahend',
        'subtract-one-digit-from-two-digit',
        'subtract-whole-tens',
        'mixed-addition-subtraction',
        'subtraction-word-problems'
      ]
    },
    {
      provider: 'Education.com',
      url: 'https://www.education.com/resources/grade-1/math/subtraction/',
      skills: [
        'subtraction-strategies',
        'subtraction-fact-fluency',
        'multi-digit-subtraction',
        'subtraction-word-problems'
      ]
    }
  ],
  qa: {
    requirePrompt: true,
    requireAnswer: true,
    requireUniqueAnswer: true,
    requireVisualWhenSourceUsesVisual: true,
    rejectTitleOnly: true,
    rejectSyntheticPayload: true
  }
};
