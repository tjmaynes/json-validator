const getValidJsonExamples = () =>
  [
    { text: '{"hello": "world"}', description: 'complex object' },
    { text: '["hello", "world"]', description: 'array' },
    { text: '""', description: 'empty string' },
  ].map((example) => ({ ...example, isValid: true }))

const getInvalidJsonExamples = () =>
  [
    { text: '{', description: 'incomplete object' },
    { text: "'", description: 'incomplete' },
  ].map((example) => ({ ...example, isValid: false }))

export const getJsonExamples = () => [
  ...getValidJsonExamples(),
  ...getInvalidJsonExamples(),
]
