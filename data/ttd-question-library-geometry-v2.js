// Grade 1 Geometry source payload catalog v2
// This file records verified public source structures for later licensed ingestion.
// It deliberately does not invent question payloads when the source only exposes metadata.

export const geometrySourcesV2 = [
  {
    id: 'k5-grade1-geometry',
    source: 'K5 Learning',
    url: 'https://www.k5learning.com/free-math-worksheets/first-grade-1/geometry',
    grade: 1,
    skills: [
      'matching-similar-shapes',
      'matching-shapes-to-names',
      'identifying-labeling-2d-shapes',
      'drawing-identifying-basic-shapes',
      'rotating-2d-shapes',
      'scaling-2d-shapes',
      'relative-position-shapes',
      '3d-shapes'
    ],
    status: 'source-cataloged'
  },
  {
    id: 'education-grade1-geometry',
    source: 'Education.com',
    url: 'https://www.education.com/resources/grade-1/worksheets/math/geometry/',
    grade: 1,
    resourceCount: 142,
    skills: [
      '2d-shapes',
      'shape-attributes',
      'shape-composition',
      'symmetry',
      '3d-shapes',
      'spatial-reasoning'
    ],
    examples: [
      'Shapes and Pictures',
      'Shapes and Sides',
      '2D and 3D Shapes',
      '3D Shapes',
      'Make it Match: Butterfly Symmetry'
    ],
    status: 'source-cataloged'
  },
  {
    id: 'education-grade1-compose-3d',
    source: 'Education.com',
    url: 'https://www.education.com/resources/grade-1/worksheets/math/geometry/three-dimensional-shapes/composing-three-dimensional-shapes/',
    grade: 1,
    resourceCount: 9,
    skills: [
      'compose-3d-shapes',
      'identify-faces',
      'shape-matching',
      'build-with-3d-shapes'
    ],
    examples: [
      'Composing 3D Shapes: Which Faces?',
      'Composing 3D Shapes: Matching',
      'Composing 3D Shapes: Which One Am I?',
      'Building With 3D Shapes: Cut and Paste'
    ],
    status: 'source-cataloged'
  },
  {
    id: 'k5-recognizing-3d-shapes',
    source: 'K5 Learning',
    url: 'https://www.k5learning.com/worksheets/math/grade-1-geometry-3-d-shapes-c.pdf',
    grade: 1,
    skill: 'recognize-and-draw-3d-shapes',
    tasks: [
      'trace cylinders and draw two more',
      'trace cubes and draw two more',
      'trace cones and draw two more',
      'trace spheres and draw two more'
    ],
    status: 'source-payload-cataloged'
  }
];

export default geometrySourcesV2;
