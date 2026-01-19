import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from 'react';
import { Question } from '@/types/question';
import {
  QuizSession,
  QuizResult,
  UserAnswer,
} from '@/types/quiz';
import { selectRandomQuestions } from '@/utils/shuffle';
import { calculateFinalResult } from '@/utils/scoring';
import { questions as allQuestions } from '@/data/questions';

interface QuizState {
  session: QuizSession | null;
  result: QuizResult | null;
}

type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'SUBMIT_ANSWER'; questionId: string; answer: UserAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESET_QUIZ' };

function generateSessionId(): string {
  return `quiz-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ': {
      const selectedQuestions = selectRandomQuestions(allQuestions, 10);
      const session: QuizSession = {
        id: generateSessionId(),
        questions: selectedQuestions,
        currentQuestionIndex: 0,
        answers: {},
        results: [],
        status: 'in_progress',
        startTime: Date.now(),
        endTime: null,
      };
      return { session, result: null };
    }

    case 'SUBMIT_ANSWER': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          answers: {
            ...state.session.answers,
            [action.questionId]: action.answer,
          },
        },
      };
    }

    case 'NEXT_QUESTION': {
      if (!state.session) return state;
      const nextIndex = Math.min(
        state.session.currentQuestionIndex + 1,
        state.session.questions.length - 1
      );
      return {
        ...state,
        session: { ...state.session, currentQuestionIndex: nextIndex },
      };
    }

    case 'PREVIOUS_QUESTION': {
      if (!state.session) return state;
      const prevIndex = Math.max(state.session.currentQuestionIndex - 1, 0);
      return {
        ...state,
        session: { ...state.session, currentQuestionIndex: prevIndex },
      };
    }

    case 'FINISH_QUIZ': {
      if (!state.session) return state;
      const completedSession: QuizSession = {
        ...state.session,
        status: 'completed',
        endTime: Date.now(),
      };
      const result = calculateFinalResult(completedSession);
      return {
        session: completedSession,
        result,
      };
    }

    case 'RESET_QUIZ':
      return { session: null, result: null };

    default:
      return state;
  }
}

interface QuizContextValue {
  session: QuizSession | null;
  result: QuizResult | null;
  currentQuestion: Question | null;
  currentAnswer: UserAnswer | undefined;
  isLastQuestion: boolean;
  startQuiz: () => void;
  submitAnswer: (questionId: string, answer: UserAnswer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

const initialState: QuizState = {
  session: null,
  result: null,
};

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const value = useMemo<QuizContextValue>(() => {
    const currentQuestion = state.session
      ? state.session.questions[state.session.currentQuestionIndex]
      : null;

    const currentAnswer = state.session && currentQuestion
      ? state.session.answers[currentQuestion.id]
      : undefined;

    const isLastQuestion = state.session
      ? state.session.currentQuestionIndex === state.session.questions.length - 1
      : false;

    return {
      session: state.session,
      result: state.result,
      currentQuestion,
      currentAnswer,
      isLastQuestion,
      startQuiz: () => dispatch({ type: 'START_QUIZ' }),
      submitAnswer: (questionId, answer) =>
        dispatch({ type: 'SUBMIT_ANSWER', questionId, answer }),
      nextQuestion: () => dispatch({ type: 'NEXT_QUESTION' }),
      previousQuestion: () => dispatch({ type: 'PREVIOUS_QUESTION' }),
      finishQuiz: () => dispatch({ type: 'FINISH_QUIZ' }),
      resetQuiz: () => dispatch({ type: 'RESET_QUIZ' }),
    };
  }, [state]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz(): QuizContextValue {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
