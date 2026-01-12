import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Flashcard from './Flashcard';
import LatencyChart from './LatencyChart';

const CARDS_DATA = [
  { id: 1, question: "execute typical instruction", answer: "1/1,000,000,000 sec = 1 nanoseconds", val: 1 },
  { id: 2, question: "read from L1 cache memory", answer: "0.5 nanoseconds", val: 0.5 },
  { id: 3, question: "branch misprediction", answer: "5 nanoseconds", val: 5 },
  { id: 4, question: "read from L2 cache memory", answer: "5 nanoseconds", val: 5 },
  { id: 5, question: "Mutex lock/unlock", answer: "25 nanoseconds", val: 25 },
  { id: 6, question: "read from main memory", answer: "100 nanoseconds", val: 100 },
  { id: 7, question: "send 2K bytes over 1Gbps network", answer: "20 microseconds = 20,000 nanoseconds", val: 20000 },
  { id: 8, question: "read 1MB sequentially from memory", answer: "250 microseconds = 250,000 nanoseconds", val: 250000 },
  { id: 9, question: "roundtrip time in the same datacenter", answer: "500 microseconds = 500,000 nanoseconds", val: 500000 },
  { id: 10, question: "read 1MB sequentially from SSD", answer: "1 millisecond = 1,000,000 nanoseconds", val: 1000000 },
  { id: 11, question: "read from new disk location (disk seek)", answer: "5 milliseconds = 5,000,000 nanoseconds", val: 5000000 },
  { id: 12, question: "read 1MB sequentially from disk", answer: "30 milliseconds = 30,000,000 nanoseconds", val: 30000000 },
  { id: 13, question: "send packet US to Europe and back", answer: "150 milliseconds = 150,000,000 nanoseconds", val: 150000000 },
];

function App() {
  const [cards, setCards] = useState(CARDS_DATA);
  const [mode, setMode] = useState('learn'); // 'learn' or 'practice'
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedStates, setFlippedStates] = useState({});
  const [showChart, setShowChart] = useState(false);
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
          <button onClick={() => setShowChart(true)}>Stats</button>
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

      {showChart && <LatencyChart data={cards} onClose={() => setShowChart(false)} />}
    </div>
  );
}

export default App;