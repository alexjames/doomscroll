import React from 'react';

const Flashcard = ({ data, mode, onScore, isFlipped, onFlip }) => {
  const handleClick = () => {
    onFlip();
  };

  const handleScore = (e, type) => {
    e.stopPropagation(); // Prevent card flip when clicking buttons
    onScore(type);
  };

  return (
    <div className="card-wrapper">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
        <div className="flip-card-inner">
          {/* Front of Card */}
          <div className="flip-card-front">
            <h2>Question</h2>
            <p style={{ fontSize: '1.5rem' }}>{data.question}</p>
            <p style={{ fontSize: '0.8rem', marginTop: '20px', opacity: 0.7 }}>(Tap to flip)</p>
          </div>

          {/* Back of Card */}
          <div className="flip-card-back">
            <h2>Answer</h2>
            <p style={{ fontSize: '1.2rem' }}>{data.answer}</p>
            
            {mode === 'practice' && (
              <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                <button onClick={(e) => handleScore(e, 'correct')} style={{ padding: '10px', background: '#2ecc71', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Got it!
                </button>
                <button onClick={(e) => handleScore(e, 'wrong')} style={{ padding: '10px', background: '#e74c3c', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Missed it
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;