// Licensed-source ingestion: normalized from publicly accessible worksheet payloads.
// Keep source attribution with every question. Do not replace source visuals with invented placeholders.

export const ttdPatternQuestionsV1 = [
  {
    id: 'k5-patterns-objects-01-01',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/worksheets/math/grade-1-patterns-objects-f.pdf',
    grade: 1,
    topic: 'patterns',
    skill: 'complete-repeating-pattern',
    type: 'visual-multiple-choice',
    prompt: 'Look at the repeating pattern. Which object completes the pattern?',
    sequence: ['blue flask', 'red graduated cylinder', 'blue flask', 'red graduated cylinder', 'blue flask', '?'],
    choices: ['blue flask', 'red graduated cylinder', 'orange beaker', 'yellow flask'],
    answer: 'red graduated cylinder',
    explanation: 'The pattern repeats blue flask, red graduated cylinder. After the blue flask, the missing object is the red graduated cylinder.',
    provenance: 'K5 Learning worksheet: Patterns of objects, row 1',
    status: 'qa-approved'
  },
  {
    id: 'k5-patterns-objects-01-02',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/worksheets/math/grade-1-patterns-objects-f.pdf',
    grade: 1,
    topic: 'patterns',
    skill: 'complete-repeating-pattern',
    type: 'visual-multiple-choice',
    prompt: 'Look at the repeating pattern. Which object completes the pattern?',
    sequence: ['blue graduated cylinder', 'orange beaker', 'orange beaker', 'blue graduated cylinder', 'orange beaker', '?'],
    choices: ['blue graduated cylinder', 'orange beaker', 'green flask', 'pink flask'],
    answer: 'orange beaker',
    explanation: 'The pattern repeats blue graduated cylinder, orange beaker, orange beaker. The missing object is an orange beaker.',
    provenance: 'K5 Learning worksheet: Patterns of objects, row 2',
    status: 'qa-approved'
  },
  {
    id: 'k5-patterns-objects-01-03',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/worksheets/math/grade-1-patterns-objects-f.pdf',
    grade: 1,
    topic: 'patterns',
    skill: 'complete-repeating-pattern',
    type: 'visual-multiple-choice',
    prompt: 'Look at the repeating pattern. Which object completes the pattern?',
    sequence: ['yellow round-bottom flask', 'yellow round-bottom flask', 'light teal flask', 'yellow round-bottom flask', 'yellow round-bottom flask', '?'],
    choices: ['yellow round-bottom flask', 'light teal flask', 'blue flask', 'orange beaker'],
    answer: 'light teal flask',
    explanation: 'The pattern repeats two yellow round-bottom flasks followed by one light teal flask. The missing object is the light teal flask.',
    provenance: 'K5 Learning worksheet: Patterns of objects, row 3',
    status: 'qa-approved'
  },
  {
    id: 'k5-patterns-objects-01-04',
    source: 'K5 Learning',
    sourceUrl: 'https://www.k5learning.com/worksheets/math/grade-1-patterns-objects-f.pdf',
    grade: 1,
    topic: 'patterns',
    skill: 'complete-repeating-pattern',
    type: 'visual-multiple-choice',
    prompt: 'Look at the repeating pattern. Which object completes the pattern?',
    sequence: ['green graduated cylinder', 'pink flask', 'green graduated cylinder', 'pink flask', 'green graduated cylinder', '?'],
    choices: ['green graduated cylinder', 'pink flask', 'blue flask', 'orange beaker'],
    answer: 'pink flask',
    explanation: 'The pattern alternates green graduated cylinder and pink flask. After the green graduated cylinder comes the pink flask.',
    provenance: 'K5 Learning worksheet: Patterns of objects, row 4',
    status: 'qa-approved'
  }
];
