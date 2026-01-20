import { Question, QuestionFormat } from './question';

export interface MultipleChoiceSingleAnswer {
  format: QuestionFormat.MULTIPLE_CHOICE_SINGLE;
  selectedIndex: number | null;
}

export interface TrueOrFalseAnswer {
  format: QuestionFormat.TRUE_OR_FALSE;
  selectedAnswer: boolean | null;
}

export interface FillInTheBlankAnswer {
  format: QuestionFormat.FILL_IN_THE_BLANK;
  enteredText: string;
}

export interface TypeAnswerAnswer {
  format: QuestionFormat.TYPE_ANSWER;
  enteredText: string;
}

export interface MultipleChoiceMultiAnswer {
  format: QuestionFormat.MULTIPLE_CHOICE_MULTI;
  selectedIndices: number[];
}

export interface MatchTheFollowingAnswer {
  format: QuestionFormat.MATCH_THE_FOLLOWING;
  matches: Record<string, string>;
}

export interface TapToRevealAnswer {
  format: QuestionFormat.TAP_TO_REVEAL;
  revealed: boolean;
  selfMarkedCorrect: boolean | null;
}

export interface OrderItemsAnswer {
  format: QuestionFormat.ORDER_ITEMS;
  orderedItemIds: string[];
}

export type UserAnswer =
  | MultipleChoiceSingleAnswer
  | TrueOrFalseAnswer
  | FillInTheBlankAnswer
  | TypeAnswerAnswer
  | MultipleChoiceMultiAnswer
  | MatchTheFollowingAnswer
  | TapToRevealAnswer
  | OrderItemsAnswer;

export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  userAnswer: UserAnswer;
}

export interface QuizSession {
  id: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  results: QuestionResult[];
  status: 'not_started' | 'in_progress' | 'completed';
  startTime: number | null;
  endTime: number | null;
}

export interface QuizResult {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  timeTaken: number;
  questionResults: QuestionResult[];
  completedAt: Date;
}
