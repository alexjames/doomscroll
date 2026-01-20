import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Question, QuestionFormat } from '@/types/question';
import {
  UserAnswer,
  MultipleChoiceSingleAnswer,
  TrueOrFalseAnswer,
  FillInTheBlankAnswer,
  TypeAnswerAnswer,
  MultipleChoiceMultiAnswer,
  MatchTheFollowingAnswer,
  TapToRevealAnswer,
  OrderItemsAnswer,
} from '@/types/quiz';
import { evaluateAnswer } from '@/utils/scoring';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/common';
import { MultipleChoiceSingle } from './MultipleChoiceSingle';
import { TrueOrFalse } from './TrueOrFalse';
import { FillInTheBlank } from './FillInTheBlank';
import { TypeAnswer } from './TypeAnswer';
import { MultipleChoiceMulti } from './MultipleChoiceMulti';
import { MatchTheFollowing } from './MatchTheFollowing';
import { TapToReveal } from './TapToReveal';
import { OrderItems } from './OrderItems';

interface QuestionContainerProps {
  question: Question;
  currentAnswer?: UserAnswer;
  onSubmitAnswer: (answer: UserAnswer) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

function createInitialAnswer(format: QuestionFormat): UserAnswer {
  switch (format) {
    case QuestionFormat.MULTIPLE_CHOICE_SINGLE:
      return { format, selectedIndex: null };
    case QuestionFormat.TRUE_OR_FALSE:
      return { format, selectedAnswer: null };
    case QuestionFormat.FILL_IN_THE_BLANK:
      return { format, enteredText: '' };
    case QuestionFormat.TYPE_ANSWER:
      return { format, enteredText: '' };
    case QuestionFormat.MULTIPLE_CHOICE_MULTI:
      return { format, selectedIndices: [] };
    case QuestionFormat.MATCH_THE_FOLLOWING:
      return { format, matches: {} };
    case QuestionFormat.TAP_TO_REVEAL:
      return { format, revealed: false, selfMarkedCorrect: null };
    case QuestionFormat.ORDER_ITEMS:
      return { format, orderedItemIds: [] };
  }
}

export function QuestionContainer({
  question,
  currentAnswer,
  onSubmitAnswer,
  onNext,
  isLastQuestion,
}: QuestionContainerProps) {
  const [localAnswer, setLocalAnswer] = useState<UserAnswer>(
    currentAnswer || createInitialAnswer(question.format)
  );
  const [isSubmitted, setIsSubmitted] = useState(!!currentAnswer);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (currentAnswer) {
      setLocalAnswer(currentAnswer);
      setIsSubmitted(true);
      const result = evaluateAnswer(question, currentAnswer);
      setIsCorrect(result.isCorrect);
    } else {
      setLocalAnswer(createInitialAnswer(question.format));
      setIsSubmitted(false);
      setIsCorrect(undefined);
    }
  }, [question.id, currentAnswer]);

  const handleSubmit = useCallback(() => {
    const result = evaluateAnswer(question, localAnswer);
    setIsCorrect(result.isCorrect);
    setIsSubmitted(true);
    onSubmitAnswer(localAnswer);
  }, [question, localAnswer, onSubmitAnswer]);

  const canSubmit = useCallback((): boolean => {
    switch (localAnswer.format) {
      case QuestionFormat.MULTIPLE_CHOICE_SINGLE:
        return (localAnswer as MultipleChoiceSingleAnswer).selectedIndex !== null;
      case QuestionFormat.TRUE_OR_FALSE:
        return (localAnswer as TrueOrFalseAnswer).selectedAnswer !== null;
      case QuestionFormat.FILL_IN_THE_BLANK:
        return (localAnswer as FillInTheBlankAnswer).enteredText.trim().length > 0;
      case QuestionFormat.TYPE_ANSWER:
        return (localAnswer as TypeAnswerAnswer).enteredText.trim().length > 0;
      case QuestionFormat.MULTIPLE_CHOICE_MULTI:
        return (localAnswer as MultipleChoiceMultiAnswer).selectedIndices.length > 0;
      case QuestionFormat.MATCH_THE_FOLLOWING:
        const matches = (localAnswer as MatchTheFollowingAnswer).matches;
        return Object.keys(matches).length > 0;
      case QuestionFormat.TAP_TO_REVEAL:
        return (localAnswer as TapToRevealAnswer).selfMarkedCorrect !== null;
      case QuestionFormat.ORDER_ITEMS:
        return ((localAnswer as OrderItemsAnswer).orderedItemIds?.length ?? 0) > 0;
    }
  }, [localAnswer]);

  const renderQuestion = () => {
    switch (question.format) {
      case QuestionFormat.MULTIPLE_CHOICE_SINGLE:
        return (
          <MultipleChoiceSingle
            question={question}
            selectedIndex={(localAnswer as MultipleChoiceSingleAnswer).selectedIndex}
            onSelect={(index) =>
              setLocalAnswer({ ...localAnswer, selectedIndex: index } as MultipleChoiceSingleAnswer)
            }
            isSubmitted={isSubmitted}
          />
        );

      case QuestionFormat.TRUE_OR_FALSE:
        return (
          <TrueOrFalse
            question={question}
            selectedAnswer={(localAnswer as TrueOrFalseAnswer).selectedAnswer}
            onSelect={(value) =>
              setLocalAnswer({ ...localAnswer, selectedAnswer: value } as TrueOrFalseAnswer)
            }
            isSubmitted={isSubmitted}
          />
        );

      case QuestionFormat.FILL_IN_THE_BLANK:
        return (
          <FillInTheBlank
            question={question}
            enteredText={(localAnswer as FillInTheBlankAnswer).enteredText}
            onTextChange={(text) =>
              setLocalAnswer({ ...localAnswer, enteredText: text } as FillInTheBlankAnswer)
            }
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
          />
        );

      case QuestionFormat.TYPE_ANSWER:
        return (
          <TypeAnswer
            question={question}
            enteredText={(localAnswer as TypeAnswerAnswer).enteredText}
            onTextChange={(text) =>
              setLocalAnswer({ ...localAnswer, enteredText: text } as TypeAnswerAnswer)
            }
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
          />
        );

      case QuestionFormat.MULTIPLE_CHOICE_MULTI:
        return (
          <MultipleChoiceMulti
            question={question}
            selectedIndices={(localAnswer as MultipleChoiceMultiAnswer).selectedIndices}
            onToggle={(index) => {
              const current = (localAnswer as MultipleChoiceMultiAnswer).selectedIndices;
              const newIndices = current.includes(index)
                ? current.filter((i) => i !== index)
                : [...current, index];
              setLocalAnswer({
                ...localAnswer,
                selectedIndices: newIndices,
              } as MultipleChoiceMultiAnswer);
            }}
            isSubmitted={isSubmitted}
          />
        );

      case QuestionFormat.MATCH_THE_FOLLOWING:
        return (
          <MatchTheFollowing
            question={question}
            matches={(localAnswer as MatchTheFollowingAnswer).matches}
            onMatch={(leftId, rightId) => {
              const current = (localAnswer as MatchTheFollowingAnswer).matches;
              setLocalAnswer({
                ...localAnswer,
                matches: { ...current, [leftId]: rightId },
              } as MatchTheFollowingAnswer);
            }}
            isSubmitted={isSubmitted}
          />
        );

      case QuestionFormat.TAP_TO_REVEAL:
        return (
          <TapToReveal
            question={question}
            isRevealed={(localAnswer as TapToRevealAnswer).revealed}
            onReveal={() =>
              setLocalAnswer({ ...localAnswer, revealed: true } as TapToRevealAnswer)
            }
            selfMarkedCorrect={(localAnswer as TapToRevealAnswer).selfMarkedCorrect}
            onSelfAssess={(correct) =>
              setLocalAnswer({
                ...localAnswer,
                selfMarkedCorrect: correct,
              } as TapToRevealAnswer)
            }
            isSubmitted={isSubmitted}
          />
        );

      case QuestionFormat.ORDER_ITEMS:
        return (
          <OrderItems
            question={question}
            orderedItemIds={(localAnswer as OrderItemsAnswer).orderedItemIds}
            onAddItem={(itemId) => {
              const current = (localAnswer as OrderItemsAnswer).orderedItemIds ?? [];
              setLocalAnswer({
                ...localAnswer,
                orderedItemIds: [...current, itemId],
              } as OrderItemsAnswer);
            }}
            onRemoveItem={(index) => {
              const current = (localAnswer as OrderItemsAnswer).orderedItemIds ?? [];
              setLocalAnswer({
                ...localAnswer,
                orderedItemIds: current.filter((_, i) => i !== index),
              } as OrderItemsAnswer);
            }}
            onClear={() => {
              setLocalAnswer({
                ...localAnswer,
                orderedItemIds: [],
              } as OrderItemsAnswer);
            }}
            isSubmitted={isSubmitted}
          />
        );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.questionContent}>{renderQuestion()}</View>
      <View style={styles.buttonContainer}>
        {!isSubmitted ? (
          <Button
            title="Submit Answer"
            onPress={handleSubmit}
            disabled={!canSubmit()}
            fullWidth
            size="large"
          />
        ) : (
          <Button
            title={isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            onPress={onNext}
            fullWidth
            size="large"
            variant={isCorrect ? 'success' : 'primary'}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContent: {
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
  },
});
