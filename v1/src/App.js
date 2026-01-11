import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Flashcard from './Flashcard';

const CARDS_DATA = [
  { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces." },
  { id: 2, question: "What is a Component?", answer: "Independent and reusable bits of code." },
  { id: 3, question: "What is State?", answer: "A built-in React object that is used to contain data or information about the component." },
  { id: 4, question: "What is a Hook?", answer: "Functions that let you use state and other React features without writing a class." },
  { id: 5, question: "What is JSX?", answer: "A syntax extension to JavaScript." },
  { id: 6, question: "What is the Virtual DOM?", answer: "A lightweight copy of the actual DOM in memory." },
  { id: 7, question: "What is Props?", answer: "Inputs to a React component. They are data passed down from a parent component." },
];

function App() {
  const [cards] = useState(CARDS_DATA);
  const [mode, setMode] = useState('learn'); // 'learn' or 'practice'
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedStates, setFlippedStates] = useState({});
  const containerRef = useRef(null);

  // Track active card index on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex > 0) {
          containerRef.current.scrollTo({
            top: (activeIndex - 1) * containerRef.current.clientHeight,
            behavior: 'smooth'
          });
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex < cards.length - 1) {
          containerRef.current.scrollTo({
            top: (activeIndex + 1) * containerRef.current.clientHeight,
            behavior: 'smooth'
          });
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentCard = cards[activeIndex];
        setFlippedStates(prev => ({
          ...prev,
          [currentCard.id]: !prev[currentCard.id]
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, cards]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'learn' ? 'practice' : 'learn'));
    // Reset score when switching modes
    setScore({ correct: 0, wrong: 0 });
  };

  const handleScoreUpdate = (type) => {
    setScore((prev) => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const handleCardFlip = (id) => {
    setFlippedStates((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="app-container" ref={containerRef}>
      {/* HUD / Controls */}
      <div className="header-hud">
        <button onClick={toggleMode}>
          Switch to {mode === 'learn' ? 'Practice' : 'Learn'} Mode
        </button>
        
        {mode === 'practice' && (
          <div className="score-board">
            Correct: {score.correct} | Wrong: {score.wrong}
          </div>
        )}
      </div>

      {/* Scrollable Card List */}
      {cards.map((card) => (
        <Flashcard 
          key={card.id} 
          data={card} 
          mode={mode}
          onScore={handleScoreUpdate}
          isFlipped={!!flippedStates[card.id]}
          onFlip={() => handleCardFlip(card.id)}
        />
      ))}
    </div>
  );
}

export default App;