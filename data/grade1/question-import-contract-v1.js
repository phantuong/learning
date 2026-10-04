// Contract for importing licensed Grade 1 question packages into the app.
// Do not populate this file with third-party content. The importer consumes
// source packages supplied by the rights holder/user and validates provenance.

const QUESTION_IMPORT_CONTRACT_V1 = {
  version: 1,
  packageFormat: {
    source: 'required',
    licenseReference: 'required',
    questions: 'required-array'
  },
  questionRequired: [
    'id',
    'sourceId',
    'grade',
    'topic',
    'skill',
    'type',
    'prompt',
    'answer',
    'qa'
  ],
  visualQuestionRequired: [
    'assets',
    'visualVerified'
  ],
  qaRequired: [
    'answerUnique',
    'promptComplete',
    'assetsCompleteWhenRequired',
    'provenanceComplete'
  ],
  productionStatuses: ['approved', 'production'],
  rejectedStatuses: ['missing-data', 'ambiguous', 'unverified-visual', 'synthetic'],
  rule: 'Only source packages supplied under the applicable license may be imported.'
};

function validateQuestion(question) {
  const missing = QUESTION_IMPORT_CONTRACT_V1.questionRequired.filter((key) => {
    return question == null || question[key] == null || question[key] === '';
  });

  if (missing.length) return { ok: false, reason: 'missing-required-fields', missing };

  const qa = question.qa || {};
  const qaMissing = QUESTION_IMPORT_CONTRACT_V1.qaRequired.filter((key) => !qa[key]);
  if (qaMissing.length) return { ok: false, reason: 'qa-failed', missing: qaMissing };

  if (question.type === 'visual' || question.type === 'image-choice') {
    const assets = question.assets;
    if (!Array.isArray(assets) || assets.length === 0 || question.visualVerified !== true) {
      return { ok: false, reason: 'unverified-visual' };
    }
  }

  if (QUESTION_IMPORT_CONTRACT_V1.rejectedStatuses.includes(question.status)) {
    return { ok: false, reason: question.status };
  }

  return { ok: true };
}

function validatePackage(pkg) {
  if (!pkg || !pkg.source || !pkg.licenseReference || !Array.isArray(pkg.questions)) {
    return { ok: false, reason: 'invalid-package' };
  }

  const results = pkg.questions.map(validateQuestion);
  const invalid = results
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => !result.ok);

  return {
    ok: invalid.length === 0,
    total: pkg.questions.length,
    accepted: pkg.questions.length - invalid.length,
    rejected: invalid
  };
}

if (typeof module !== 'undefined') {
  module.exports = { QUESTION_IMPORT_CONTRACT_V1, validateQuestion, validatePackage };
}
