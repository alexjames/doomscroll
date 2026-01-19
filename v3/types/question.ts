export enum QuestionFormat {
  MULTIPLE_CHOICE_SINGLE = 'MULTIPLE_CHOICE_SINGLE',
  TRUE_OR_FALSE = 'TRUE_OR_FALSE',
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
  TYPE_ANSWER = 'TYPE_ANSWER',
  MULTIPLE_CHOICE_MULTI = 'MULTIPLE_CHOICE_MULTI',
  MATCH_THE_FOLLOWING = 'MATCH_THE_FOLLOWING',
  TAP_TO_REVEAL = 'TAP_TO_REVEAL',
}

export interface BaseQuestion {
  id: string;
  format: QuestionFormat;
  question: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  points?: number;
  explanation?: string;
}

export interface MultipleChoiceSingleQuestion extends BaseQuestion {
  format: QuestionFormat.MULTIPLE_CHOICE_SINGLE;
  options: [string, string, string, string];
  correctAnswerIndex: 0 | 1 | 2 | 3;
}

export interface TrueOrFalseQuestion extends BaseQuestion {
  format: QuestionFormat.TRUE_OR_FALSE;
  correctAnswer: boolean;
}

export interface FillInTheBlankQuestion extends BaseQuestion {
  format: QuestionFormat.FILL_IN_THE_BLANK;
  questionWithBlank: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  caseSensitive?: boolean;
}

export interface TypeAnswerQuestion extends BaseQuestion {
  format: QuestionFormat.TYPE_ANSWER;
  correctAnswer: string;
  acceptableAnswers?: string[];
  caseSensitive?: boolean;
}

export interface MultipleChoiceMultiQuestion extends BaseQuestion {
  format: QuestionFormat.MULTIPLE_CHOICE_MULTI;
  options: string[];
  correctAnswerIndices: number[];
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchTheFollowingQuestion extends BaseQuestion {
  format: QuestionFormat.MATCH_THE_FOLLOWING;
  pairs: MatchPair[];
}

export interface TapToRevealQuestion extends BaseQuestion {
  format: QuestionFormat.TAP_TO_REVEAL;
  answer: string;
}

export type Question =
  | MultipleChoiceSingleQuestion
  | TrueOrFalseQuestion
  | FillInTheBlankQuestion
  | TypeAnswerQuestion
  | MultipleChoiceMultiQuestion
  | MatchTheFollowingQuestion
  | TapToRevealQuestion;
