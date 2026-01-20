import {
  Question,
  QuestionFormat,
  MultipleChoiceSingleQuestion,
  TrueOrFalseQuestion,
  FillInTheBlankQuestion,
  TypeAnswerQuestion,
  MultipleChoiceMultiQuestion,
  MatchTheFollowingQuestion,
  OrderItemsQuestion,
} from '@/types/question';
import {
  UserAnswer,
  QuestionResult,
  QuizSession,
  QuizResult,
  MultipleChoiceSingleAnswer,
  TrueOrFalseAnswer,
  FillInTheBlankAnswer,
  TypeAnswerAnswer,
  MultipleChoiceMultiAnswer,
  MatchTheFollowingAnswer,
  TapToRevealAnswer,
  OrderItemsAnswer,
} from '@/types/quiz';

function normalizeText(text: string, caseSensitive: boolean): string {
  const trimmed = text.trim();
  return caseSensitive ? trimmed : trimmed.toLowerCase();
}

function checkTextAnswer(
  userInput: string,
  correctAnswer: string,
  acceptableAnswers: string[] = [],
  caseSensitive: boolean = false
): boolean {
  const normalizedInput = normalizeText(userInput, caseSensitive);
  const allCorrect = [correctAnswer, ...acceptableAnswers];
  return allCorrect.some(
    (ans) => normalizeText(ans, caseSensitive) === normalizedInput
  );
}

function checkMultiSelect(
  selected: number[],
  correct: number[]
): { isCorrect: boolean; partialScore: number } {
  const selectedSet = new Set(selected);
  const correctSet = new Set(correct);

  if (
    selectedSet.size === correctSet.size &&
    [...selectedSet].every((i) => correctSet.has(i))
  ) {
    return { isCorrect: true, partialScore: 1 };
  }

  let correctSelections = 0;
  let incorrectSelections = 0;

  selected.forEach((i) => {
    if (correctSet.has(i)) {
      correctSelections++;
    } else {
      incorrectSelections++;
    }
  });

  const partialScore = Math.max(
    0,
    (correctSelections - incorrectSelections) / correct.length
  );

  return { isCorrect: false, partialScore };
}

function checkMatches(
  userMatches: Record<string, string>,
  correctPairs: { id: string }[]
): { isCorrect: boolean; partialScore: number } {
  let correctCount = 0;

  correctPairs.forEach((pair) => {
    if (userMatches[pair.id] === pair.id) {
      correctCount++;
    }
  });

  const isCorrect = correctCount === correctPairs.length;
  const partialScore = correctCount / correctPairs.length;

  return { isCorrect, partialScore };
}

export function evaluateAnswer(
  question: Question,
  answer: UserAnswer
): { isCorrect: boolean; pointsEarned: number } {
  const maxPoints = question.points ?? 1;

  switch (question.format) {
    case QuestionFormat.MULTIPLE_CHOICE_SINGLE: {
      const q = question as MultipleChoiceSingleQuestion;
      const a = answer as MultipleChoiceSingleAnswer;
      const isCorrect = a.selectedIndex === q.correctAnswerIndex;
      return { isCorrect, pointsEarned: isCorrect ? maxPoints : 0 };
    }

    case QuestionFormat.TRUE_OR_FALSE: {
      const q = question as TrueOrFalseQuestion;
      const a = answer as TrueOrFalseAnswer;
      const isCorrect = a.selectedAnswer === q.correctAnswer;
      return { isCorrect, pointsEarned: isCorrect ? maxPoints : 0 };
    }

    case QuestionFormat.FILL_IN_THE_BLANK: {
      const q = question as FillInTheBlankQuestion;
      const a = answer as FillInTheBlankAnswer;
      const isCorrect = checkTextAnswer(
        a.enteredText,
        q.correctAnswer,
        q.acceptableAnswers,
        q.caseSensitive ?? false
      );
      return { isCorrect, pointsEarned: isCorrect ? maxPoints : 0 };
    }

    case QuestionFormat.TYPE_ANSWER: {
      const q = question as TypeAnswerQuestion;
      const a = answer as TypeAnswerAnswer;
      const isCorrect = checkTextAnswer(
        a.enteredText,
        q.correctAnswer,
        q.acceptableAnswers,
        q.caseSensitive ?? false
      );
      return { isCorrect, pointsEarned: isCorrect ? maxPoints : 0 };
    }

    case QuestionFormat.MULTIPLE_CHOICE_MULTI: {
      const q = question as MultipleChoiceMultiQuestion;
      const a = answer as MultipleChoiceMultiAnswer;
      const { isCorrect, partialScore } = checkMultiSelect(
        a.selectedIndices,
        q.correctAnswerIndices
      );
      const earnedPoints = isCorrect
        ? maxPoints
        : Math.floor(partialScore * maxPoints);
      return { isCorrect, pointsEarned: earnedPoints };
    }

    case QuestionFormat.MATCH_THE_FOLLOWING: {
      const q = question as MatchTheFollowingQuestion;
      const a = answer as MatchTheFollowingAnswer;
      const { isCorrect, partialScore } = checkMatches(a.matches, q.pairs);
      const earnedPoints = isCorrect
        ? maxPoints
        : Math.floor(partialScore * maxPoints);
      return { isCorrect, pointsEarned: earnedPoints };
    }

    case QuestionFormat.TAP_TO_REVEAL: {
      const a = answer as TapToRevealAnswer;
      const isCorrect = a.selfMarkedCorrect === true;
      return { isCorrect, pointsEarned: isCorrect ? maxPoints : 0 };
    }

    case QuestionFormat.ORDER_ITEMS: {
      const q = question as OrderItemsQuestion;
      const a = answer as OrderItemsAnswer;
      const userOrder = a.orderedItemIds ?? [];

      if (userOrder.length !== q.correctOrder.length) {
        return { isCorrect: false, pointsEarned: 0 };
      }

      const isCorrect = userOrder.every((id, index) => id === q.correctOrder[index]);
      return { isCorrect, pointsEarned: isCorrect ? maxPoints : 0 };
    }

    default:
      return { isCorrect: false, pointsEarned: 0 };
  }
}

export function calculateFinalResult(session: QuizSession): QuizResult {
  const results: QuestionResult[] = [];
  let totalPoints = 0;
  let earnedPoints = 0;
  let correctAnswers = 0;

  session.questions.forEach((question) => {
    const answer = session.answers[question.id];
    const maxPoints = question.points ?? 1;
    totalPoints += maxPoints;

    if (answer) {
      const evaluation = evaluateAnswer(question, answer);
      earnedPoints += evaluation.pointsEarned;
      if (evaluation.isCorrect) correctAnswers++;

      results.push({
        questionId: question.id,
        isCorrect: evaluation.isCorrect,
        pointsEarned: evaluation.pointsEarned,
        userAnswer: answer,
      });
    } else {
      results.push({
        questionId: question.id,
        isCorrect: false,
        pointsEarned: 0,
        userAnswer: { format: question.format } as UserAnswer,
      });
    }
  });

  const timeTaken =
    session.endTime && session.startTime
      ? Math.round((session.endTime - session.startTime) / 1000)
      : 0;

  return {
    sessionId: session.id,
    totalQuestions: session.questions.length,
    correctAnswers,
    incorrectAnswers: session.questions.length - correctAnswers,
    totalPoints,
    earnedPoints,
    percentage: Math.round((earnedPoints / totalPoints) * 100),
    timeTaken,
    questionResults: results,
    completedAt: new Date(),
  };
}
