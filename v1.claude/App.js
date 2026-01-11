import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, BookOpen, Target } from 'lucide-react';

const FLASHCARDS = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { question: "What is the chemical symbol for gold?", answer: "Au" },
  { question: "In what year did World War II end?", answer: "1945" },
  { question: "What is the smallest prime number?", answer: "2" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" }
];

const FlashCard = ({ card, isFlipped, onFlip, mode, onAnswer, cardIndex }) => {
  return (
    <div className="h-screen flex items-center justify-center p-4 snap-start">
      <div className="w-full max-w-2xl">
        <div className="relative h-96 cursor-pointer" onClick={onFlip}>
          <div className={`absolute w-full h-full transition-all duration-500 transform ${isFlipped ? 'rotate-y-180' : ''}`}
               style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center p-8"
                 style={{ backfaceVisibility: 'hidden' }}>
              <div className="text-center">
                <div className="text-white text-sm font-semibold mb-4 opacity-80">QUESTION</div>
                <h2 className="text-white text-3xl font-bold">{card.question}</h2>
                <div className="text-white text-sm mt-8 opacity-60">Tap to reveal answer</div>
              </div>
            </div>
            <div className="absolute w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-2xl flex items-center justify-center p-8 rotate-y-180"
                 style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="text-center">
                <div className="text-white text-sm font-semibold mb-4 opacity-80">ANSWER</div>
                <h2 className="text-white text-3xl font-bold">{card.answer}</h2>
                {mode === 'practice' && (
                  <div className="flex gap-4 justify-center mt-8" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onAnswer(cardIndex, false)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Wrong
                    </button>
                    <button
                      onClick={() => onAnswer(cardIndex, true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Correct
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-600">
          Swipe up for next card • {cardIndex + 1} of {FLASHCARDS.length}
        </div>
      </div>
    </div>
  );
};

export default function FlashcardApp() {
  const [mode, setMode] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [answers, setAnswers] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const cardHeight = containerRef.current.clientHeight;
      const newCard = Math.round(scrollTop / cardHeight);
      if (newCard !== currentCard && newCard >= 0 && newCard < FLASHCARDS.length) {
        setCurrentCard(newCard);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentCard]);

  const handleFlip = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAnswer = (index, correct) => {
    setAnswers(prev => ({ ...prev, [index]: correct }));
    
    // Auto scroll to next card after answering
    setTimeout(() => {
      if (index < FLASHCARDS.length - 1 && containerRef.current) {
        containerRef.current.scrollTo({
          top: (index + 1) * containerRef.current.clientHeight,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const resetQuiz = () => {
    setCurrentCard(0);
    setFlippedCards({});
    setAnswers({});
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getScore = () => {
    const correct = Object.values(answers).filter(a => a === true).length;
    const wrong = Object.values(answers).filter(a => a === false).length;
    return { correct, wrong };
  };

  if (!mode) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Flashcards</h1>
          <p className="text-gray-600 mb-12">Choose your study mode</p>
          <div className="space-y-4">
            <button
              onClick={() => setMode('learn')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl font-semibold text-xl transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <BookOpen size={28} />
              Learn Mode
            </button>
            <button
              onClick={() => setMode('practice')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 rounded-xl font-semibold text-xl transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <Target size={28} />
              Practice Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { correct, wrong } = getScore();
  const allAnswered = Object.keys(answers).length === FLASHCARDS.length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">
            {mode === 'learn' ? 'Learn Mode' : 'Practice Mode'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {mode === 'practice' && (
            <div className="flex gap-6 text-sm font-semibold">
              <div className="text-green-600">✓ {correct}</div>
              <div className="text-red-600">✗ {wrong}</div>
            </div>
          )}
          <button
            onClick={() => setMode(null)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Exit
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {FLASHCARDS.map((card, index) => (
          <FlashCard
            key={index}
            card={card}
            cardIndex={index}
            isFlipped={flippedCards[index] || false}
            onFlip={() => handleFlip(index)}
            mode={mode}
            onAnswer={handleAnswer}
          />
        ))}
      </div>

      {mode === 'practice' && allAnswered && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
          <p className="text-gray-600 mb-4">
            Score: {correct} / {FLASHCARDS.length} ({Math.round((correct / FLASHCARDS.length) * 100)}%)
          </p>
          <button
            onClick={resetQuiz}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      )}

      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}