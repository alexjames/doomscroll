import {
  Question,
  QuestionFormat,
  MultipleChoiceSingleQuestion,
  TrueOrFalseQuestion,
  FillInTheBlankQuestion,
  TypeAnswerQuestion,
  MultipleChoiceMultiQuestion,
  MatchTheFollowingQuestion,
  TapToRevealQuestion,
  OrderItemsQuestion,
} from '@/types/question';

const multipleChoiceSingleQuestions: MultipleChoiceSingleQuestion[] = [
  {
    id: 'mcs-1',
    format: QuestionFormat.MULTIPLE_CHOICE_SINGLE,
    question: 'Which hook is used for side effects in React?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswerIndex: 1,
    category: 'React',
    difficulty: 'easy',
  },
  {
    id: 'mcs-2',
    format: QuestionFormat.MULTIPLE_CHOICE_SINGLE,
    question: 'What does CSS stand for?',
    options: [
      'Computer Style Sheets',
      'Creative Style Sheets',
      'Cascading Style Sheets',
      'Colorful Style Sheets',
    ],
    correctAnswerIndex: 2,
    category: 'Web',
    difficulty: 'easy',
  },
  {
    id: 'mcs-3',
    format: QuestionFormat.MULTIPLE_CHOICE_SINGLE,
    question: 'Which data structure uses LIFO (Last In, First Out)?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correctAnswerIndex: 1,
    category: 'Data Structures',
    difficulty: 'medium',
  },
];

const trueOrFalseQuestions: TrueOrFalseQuestion[] = [
  {
    id: 'tf-1',
    format: QuestionFormat.TRUE_OR_FALSE,
    question: 'TypeScript is a superset of JavaScript.',
    correctAnswer: true,
    category: 'TypeScript',
    difficulty: 'easy',
  },
  {
    id: 'tf-2',
    format: QuestionFormat.TRUE_OR_FALSE,
    question: 'In JavaScript, null and undefined are the same.',
    correctAnswer: false,
    category: 'JavaScript',
    difficulty: 'medium',
  },
  {
    id: 'tf-3',
    format: QuestionFormat.TRUE_OR_FALSE,
    question: 'React Native can only build iOS applications.',
    correctAnswer: false,
    category: 'React Native',
    difficulty: 'easy',
  },
];

const fillInTheBlankQuestions: FillInTheBlankQuestion[] = [
  {
    id: 'fitb-1',
    format: QuestionFormat.FILL_IN_THE_BLANK,
    question: 'Complete the statement:',
    questionWithBlank: 'React uses a ___ DOM to optimize rendering performance.',
    correctAnswer: 'virtual',
    acceptableAnswers: ['Virtual', 'VIRTUAL'],
    caseSensitive: false,
    category: 'React',
    difficulty: 'medium',
  },
  {
    id: 'fitb-2',
    format: QuestionFormat.FILL_IN_THE_BLANK,
    question: 'Complete the statement:',
    questionWithBlank: 'The Big O notation O(1) represents ___ time complexity.',
    correctAnswer: 'constant',
    acceptableAnswers: ['Constant', 'CONSTANT'],
    caseSensitive: false,
    category: 'Algorithms',
    difficulty: 'medium',
  },
];

const typeAnswerQuestions: TypeAnswerQuestion[] = [
  {
    id: 'ta-1',
    format: QuestionFormat.TYPE_ANSWER,
    question: 'What keyword is used to declare a constant in JavaScript?',
    correctAnswer: 'const',
    acceptableAnswers: ['CONST', 'Const'],
    caseSensitive: false,
    category: 'JavaScript',
    difficulty: 'easy',
  },
  {
    id: 'ta-2',
    format: QuestionFormat.TYPE_ANSWER,
    question: 'What is the name of the package manager that comes with Node.js?',
    correctAnswer: 'npm',
    acceptableAnswers: ['NPM', 'Npm'],
    caseSensitive: false,
    category: 'Node.js',
    difficulty: 'easy',
  },
];

const multipleChoiceMultiQuestions: MultipleChoiceMultiQuestion[] = [
  {
    id: 'mcm-1',
    format: QuestionFormat.MULTIPLE_CHOICE_MULTI,
    question: 'Which of the following are valid React hooks? (Select all that apply)',
    options: ['useState', 'useQuery', 'useEffect', 'useMemo', 'useAsync'],
    correctAnswerIndices: [0, 2, 3],
    category: 'React',
    difficulty: 'medium',
    points: 2,
  },
  {
    id: 'mcm-2',
    format: QuestionFormat.MULTIPLE_CHOICE_MULTI,
    question: 'Which are primitive data types in JavaScript? (Select all that apply)',
    options: ['string', 'object', 'number', 'array', 'boolean'],
    correctAnswerIndices: [0, 2, 4],
    category: 'JavaScript',
    difficulty: 'medium',
    points: 2,
  },
];

const matchTheFollowingQuestions: MatchTheFollowingQuestion[] = [
  {
    id: 'mtf-1',
    format: QuestionFormat.MATCH_THE_FOLLOWING,
    question: 'Match the JavaScript array method with its description:',
    pairs: [
      { id: 'map', left: 'map()', right: 'Creates new array with transformed elements' },
      { id: 'filter', left: 'filter()', right: 'Creates array with elements that pass test' },
      { id: 'reduce', left: 'reduce()', right: 'Reduces array to single value' },
      { id: 'find', left: 'find()', right: 'Returns first element matching condition' },
    ],
    category: 'JavaScript',
    difficulty: 'hard',
    points: 3,
  },
  {
    id: 'mtf-2',
    format: QuestionFormat.MATCH_THE_FOLLOWING,
    question: 'Match the HTTP status code with its meaning:',
    pairs: [
      { id: '200', left: '200', right: 'OK - Success' },
      { id: '404', left: '404', right: 'Not Found' },
      { id: '500', left: '500', right: 'Internal Server Error' },
      { id: '401', left: '401', right: 'Unauthorized' },
    ],
    category: 'Web',
    difficulty: 'medium',
    points: 3,
  },
];

const tapToRevealQuestions: TapToRevealQuestion[] = [
  {
    id: 'ttr-1',
    format: QuestionFormat.TAP_TO_REVEAL,
    question: 'What does the "S" in SOLID principles stand for?',
    answer: 'Single Responsibility Principle',
    category: 'Design Patterns',
    difficulty: 'medium',
  },
  {
    id: 'ttr-2',
    format: QuestionFormat.TAP_TO_REVEAL,
    question: 'What is the time complexity of binary search?',
    answer: 'O(log n)',
    category: 'Algorithms',
    difficulty: 'medium',
  },
  {
    id: 'ttr-3',
    format: QuestionFormat.TAP_TO_REVEAL,
    question: 'What does API stand for?',
    answer: 'Application Programming Interface',
    category: 'General',
    difficulty: 'easy',
  },
];

const orderItemsQuestions: OrderItemsQuestion[] = [
  {
    id: 'oi-1',
    format: QuestionFormat.ORDER_ITEMS,
    question: 'Arrange the parts to form a valid HTTP GET request:',
    preview: 'GET /api/users HTTP/1.1',
    correctOrder: ['get', 'path', 'http', 'slash', 'version'],
    items: [
      { id: 'get', text: 'GET' },
      { id: 'path', text: '/api/users' },
      { id: 'http', text: 'HTTP' },
      { id: 'slash', text: '/' },
      { id: 'version', text: '1.1' },
    ],
    distractors: [
      { id: 'post', text: 'POST' },
      { id: 'v2', text: '2.0' },
    ],
    category: 'HTTP',
    difficulty: 'medium',
    points: 2,
  },
  {
    id: 'oi-2',
    format: QuestionFormat.ORDER_ITEMS,
    question: 'Arrange the parts to form a valid HTTP POST request:',
    preview: 'POST /api/login HTTP/1.1',
    correctOrder: ['post', 'path', 'http', 'slash', 'version'],
    items: [
      { id: 'post', text: 'POST' },
      { id: 'path', text: '/api/login' },
      { id: 'http', text: 'HTTP' },
      { id: 'slash', text: '/' },
      { id: 'version', text: '1.1' },
    ],
    distractors: [
      { id: 'get', text: 'GET' },
      { id: 'put', text: 'PUT' },
    ],
    category: 'HTTP',
    difficulty: 'medium',
    points: 2,
  },
  {
    id: 'oi-3',
    format: QuestionFormat.ORDER_ITEMS,
    question: 'Arrange the parts to form a valid HTTP PUT request:',
    preview: 'PUT /api/users/123 HTTP/1.1',
    correctOrder: ['put', 'path', 'http', 'slash', 'version'],
    items: [
      { id: 'put', text: 'PUT' },
      { id: 'path', text: '/api/users/123' },
      { id: 'http', text: 'HTTP' },
      { id: 'slash', text: '/' },
      { id: 'version', text: '1.1' },
    ],
    distractors: [
      { id: 'patch', text: 'PATCH' },
      { id: 'delete', text: 'DELETE' },
    ],
    category: 'HTTP',
    difficulty: 'medium',
    points: 2,
  },
  {
    id: 'oi-4',
    format: QuestionFormat.ORDER_ITEMS,
    question: 'Arrange the parts to form a valid HTTP DELETE request:',
    preview: 'DELETE /api/posts/456 HTTP/1.1',
    correctOrder: ['delete', 'path', 'http', 'slash', 'version'],
    items: [
      { id: 'delete', text: 'DELETE' },
      { id: 'path', text: '/api/posts/456' },
      { id: 'http', text: 'HTTP' },
      { id: 'slash', text: '/' },
      { id: 'version', text: '1.1' },
    ],
    distractors: [
      { id: 'get', text: 'GET' },
      { id: 'remove', text: 'REMOVE' },
    ],
    category: 'HTTP',
    difficulty: 'medium',
    points: 2,
  },
  {
    id: 'oi-5',
    format: QuestionFormat.ORDER_ITEMS,
    question: 'Arrange the parts to form a valid HTTP PATCH request:',
    preview: 'PATCH /api/settings HTTP/1.1',
    correctOrder: ['patch', 'path', 'http', 'slash', 'version'],
    items: [
      { id: 'patch', text: 'PATCH' },
      { id: 'path', text: '/api/settings' },
      { id: 'http', text: 'HTTP' },
      { id: 'slash', text: '/' },
      { id: 'version', text: '1.1' },
    ],
    distractors: [
      { id: 'put', text: 'PUT' },
      { id: 'update', text: 'UPDATE' },
    ],
    category: 'HTTP',
    difficulty: 'medium',
    points: 2,
  },
];

export const questions: Question[] = [
  ...multipleChoiceSingleQuestions,
  ...trueOrFalseQuestions,
  ...fillInTheBlankQuestions,
  ...typeAnswerQuestions,
  ...multipleChoiceMultiQuestions,
  ...matchTheFollowingQuestions,
  ...tapToRevealQuestions,
  ...orderItemsQuestions,
];
