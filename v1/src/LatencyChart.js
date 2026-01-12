import React, { useState } from 'react';

const LatencyChart = ({ data, onClose }) => {
  const [scaleType, setScaleType] = useState('log');

  // Filter out items without values just in case
  const chartData = data.filter(d => d.val !== undefined).sort((a, b) => a.val - b.val);
  
  if (chartData.length === 0) return null;

  const minVal = chartData[0].val;
  const maxVal = chartData[chartData.length - 1].val;

  // Calculate Log Scale
  const minLog = Math.log10(minVal);
  const maxLog = Math.log10(maxVal);
  const range = maxLog - minLog;

  const getWidth = (val) => {
    if (scaleType === 'linear') {
      const percent = (val / maxVal) * 100;
      return Math.max(percent, 0.5) + '%';
    }

    const logVal = Math.log10(val);
    // Map log value to percentage (0 to 100)
    // We add a small buffer so the smallest bar is visible
    const percent = ((logVal - minLog) / range) * 100;
    return Math.max(percent, 0.5) + '%';
  };

  return (
    <div className="chart-overlay">
      <div className="chart-container">
        <div className="chart-header">
          <h2>Latency Comparison ({scaleType === 'log' ? 'Log' : 'Linear'} Scale)</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setScaleType(scaleType === 'log' ? 'linear' : 'log')}>
              Switch to {scaleType === 'log' ? 'Linear' : 'Log'}
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="chart-body">
          {chartData.map((item) => (
            <div key={item.id} className="chart-row">
              <div className="chart-label">{item.question}</div>
              <div className="chart-bar-container">
                <div className="chart-bar" style={{ width: getWidth(item.val) }}>
                  <span className="chart-value">{item.val.toLocaleString()} ns</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatencyChart;