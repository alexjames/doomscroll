import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Flashcard from './Flashcard';

const CARDS_DATA = [
  { id: 1, question: "execute typical instruction", answer: "1/1,000,000,000 sec = 1 nanoseconds" },
  { id: 2, question: "fetch from L1 cache memory", answer: "0.5 nanoseconds" },
  { id: 3, question: "branch misprediction", answer: "5 nanoseconds" },
  { id: 4, question: "fetch from L2 cache memory", answer: "7 nanoseconds" },
  { id: 5, question: "Mutex lock/unlock", answer: "25 nanoseconds" },
  { id: 6, question: "fetch from main memory", answer: "100 nanoseconds" },
  { id: 7, question: "send 2K bytes over 1Gbps network", answer: "20,000 nanoseconds" },
  { id: 8, question: "read 1MB sequentially from memory", answer: "250,000 nanoseconds" },
  { id: 9, question: "fetch from new disk location (seek)", answer: "8,000,000 nanoseconds" },
  { id: 10, question: "read 1MB sequentially from disk", answer: "20,000,000 nanoseconds" },
  { id: 11, question: "send packet US to Europe and back", answer: "150 milliseconds = 150,000,000 nanoseconds" },
];

function App() {
  const [cards, setCards] = useState(CARDS_DATA);
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

  const shuffleCards = () => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
    setFlippedStates({});
    setActiveIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container" ref={containerRef}>
      {/* HUD / Controls */}
      <div className="header-hud">
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={toggleMode}>
            Switch to {mode === 'learn' ? 'Practice' : 'Learn'} Mode
          </button>
          <button onClick={shuffleCards}>Shuffle</button>
        </div>
        
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