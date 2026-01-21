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
  StackItemsQuestion,
} from '@/types/question';

const multipleChoiceSingleQuestions: MultipleChoiceSingleQuestion[] = [
  {
    id: 'mcs-1',
    format: QuestionFormat.MULTIPLE_CHOICE_SINGLE,
    question: 'How many layers exist in the OSI model?',
    options: ['3', '7', '5', '4'],
    correctAnswerIndex: 1,
    category: 'React',
    difficulty: 'easy',
  },
  {
    id: 'mcs-2',
    format: QuestionFormat.MULTIPLE_CHOICE_SINGLE,
    question: 'Which of these is NOT a layer in the OSI model?',
    options: [
      'Physical Layer',
      'Application Layer',
      'Transport Layer',
      'User Layer',
    ],
    correctAnswerIndex: 3,
    category: 'Web',
    difficulty: 'easy',
  },
  {
    id: 'mcs-3',
    format: QuestionFormat.MULTIPLE_CHOICE_SINGLE,
    question: 'Which layer manages the routing and forwarding of packets?',
    options: [
      'Physical Layer',
      'Application Layer',
      'Transport Layer',
      'Network Layer',
    ],
    correctAnswerIndex: 3,
    category: 'Data Structures',
    difficulty: 'medium',
  },
];

const trueOrFalseQuestions: TrueOrFalseQuestion[] = [
];

const fillInTheBlankQuestions: FillInTheBlankQuestion[] = [
];

const typeAnswerQuestions: TypeAnswerQuestion[] = [
];

const multipleChoiceMultiQuestions: MultipleChoiceMultiQuestion[] = [
];

const matchTheFollowingQuestions: MatchTheFollowingQuestion[] = [
];

const tapToRevealQuestions: TapToRevealQuestion[] = [
];

const orderItemsQuestions: OrderItemsQuestion[] = [
];

const stackItemsQuestions: StackItemsQuestion[] = [
  {
    id: 'stack-1',
    format: QuestionFormat.STACK_ITEMS,
    question: 'Order the OSI model layers from bottom to top',
    correctOrder: [
      'physical',
      'datalink',
      'network',
      'transport',
      'session',
      'presentation',
      'application',
    ],
    items: [
      { id: 'physical', text: 'Physical Layer' },
      { id: 'datalink', text: 'Data Link Layer' },
      { id: 'network', text: 'Network Layer' },
      { id: 'transport', text: 'Transport Layer' },
      { id: 'session', text: 'Session Layer' },
      { id: 'presentation', text: 'Presentation Layer' },
      { id: 'application', text: 'Application Layer' },
    ],
    category: 'Networking',
    difficulty: 'medium',
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
  ...stackItemsQuestions,
];
